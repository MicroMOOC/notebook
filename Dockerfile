FROM jupyter/base-notebook:1dc1481636a2
# jupyter/base-notebook updated 2018-04-27
MAINTAINER ome-devel@lists.openmicroscopy.org.uk

USER root
RUN apt-get update -y && \
    apt-get install -y \
        build-essential \
        curl \
        git

USER jovyan
# Default workdir: /home/jovyan

# Autoupdate notebooks https://github.com/data-8/nbgitpuller
RUN pip install git+https://github.com/data-8/gitautosync && \
    jupyter serverextension enable --py nbgitpuller

# 将项目中的notebook源代码替换到镜像中
COPY notebook/ /opt/conda/lib/python3.6/site-packages/notebook/


# Autodetects jupyterhub and standalone modes
CMD ["start-notebook.sh"]

