FROM jupyter/base-notebook:213760e5674e
MAINTAINER ome-devel@lists.openmicroscopy.org.uk

USER root

# Set the locale
RUN locale-gen zh_CN.UTF-8  
ENV LANG zh_CN.UTF-8
ENV LANGUAGE zh_CN.UTF-8
ENV LC_ALL zh_CN.UTF-8

RUN apt-get update -y && \
    apt-get install -y \
        build-essential \
        curl \
        git

USER jovyan
# Default workdir: /home/jovyan

WORKDIR $HOME

# 安装jupyterlab
# 卸载已有的jupyterlab
RUN conda uninstall jupyterlab

# 拉取jupyterlab源码
RUN git clone https://github.com/MicroMOOC/jupyterlab.git

WORKDIR $HOME/jupyterlab

# 切换到2.2.x开发分支，注意：线上的Dockerfile，此处的分支需要修改为2.2.x
RUN git checkout 2.2.x-develop

# 本地安装jupyterlab
RUN pip install . && \
    jlpm install && \
    jlpm run build && \
    jlpm run build:core && \
    jupyter lab build

# 安装lab插件
RUN jupyter labextension link ./packages/filebrowser
#RUN jupyter labextension link ./packages/mainmenu
RUN jupyter labextension install @suimz/jupyterlab-nierus

WORKDIR $HOME


# 安装Notebook
# 将项目中的notebook源代码替换到镜像中
COPY notebook/static/ /opt/conda/lib/python3.7/site-packages/notebook/static
COPY notebook/templates/ /opt/conda/lib/python3.7/site-packages/notebook/templates


# 安装nbgitpuller
RUN pip install git+https://github.com/MicroMOOC/nbgitpuller && \
    jupyter serverextension enable --py nbgitpuller && \
    conda install -y -q nbval


# 安装python开发包
# 安装依赖
RUN mkdir .setup
ADD requirements.txt .setup/
RUN pip install -r .setup/requirements.txt

# Autodetects jupyterhub and standalone modes
CMD ["start-notebook.sh"]
