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

# 卸载已有的jupyterlab
RUN conda uninstall jupyterlab

WORKDIR $HOME

# 拉取jupyterlab源码
RUN git clone https://github.com/MicroMOOC/jupyterlab.git

WORKDIR $HOME/jupyterlab

# 本地安装jupyterlab
RUN pip install .
RUN jlpm install

# Autoupdate notebooks https://github.com/data-8/nbgitpuller
# nbval for testing reproducibility
RUN pip install git+https://github.com/MicroMOOC/nbgitpuller && \
    jupyter serverextension enable --py nbgitpuller && \
    conda install -y -q nbval

## upgrade jupyterlab
# RUN conda install -c conda-forge jupyterlab=2

## install jupyterlab plugins
RUN jupyter labextension install @suimz/jupyterlab-nierus

# 安装依赖
RUN mkdir .setup
ADD requirements.txt .setup/
RUN pip install -r .setup/requirements.txt

# 将项目中的notebook源代码替换到镜像中
## css+js
COPY notebook/static/ /opt/conda/lib/python3.7/site-packages/notebook/static

## 2. html file
COPY notebook/templates/ /opt/conda/lib/python3.7/site-packages/notebook/templates

# Autodetects jupyterhub and standalone modes
CMD ["start-notebook.sh"]
