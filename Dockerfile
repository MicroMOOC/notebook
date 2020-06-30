FROM jupyter/base-notebook:213760e5674e
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
# nbval for testing reproducibility
RUN pip install git+https://github.com/data-8/gitautosync && \
    jupyter serverextension enable --py nbgitpuller && \
    conda install -y -q nbval

# create a python3 environment (for OMERO-PY compatibility)
RUN mkdir .setup
ADD environment-python3.yml .setup/
RUN conda env create -n python3 -f .setup/environment-python3.yml && \
    # Jupyterlab component for ipywidgets (must match jupyterlab version) \
    jupyter labextension install @jupyter-widgets/jupyterlab-manager@1.0

# 将项目中的notebook源代码替换到镜像中
## css+js
COPY notebook/static/ /opt/conda/lib/python3.7/site-packages/notebook/static

## 2. html file
COPY notebook/templates/ /opt/conda/lib/python3.7/site-packages/notebook/templates

# Autodetects jupyterhub and standalone modes
CMD ["start-notebook.sh"]
