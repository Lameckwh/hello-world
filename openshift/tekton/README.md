This folder contains Tekton/Openshift pipeline manifests to build and push the `hello-world` image.

Files:
- `cluster-task-npm.yaml` - ClusterTask that runs `npm ci` and `npm run build` inside node:20.
- `cluster-task-kaniko.yaml` - ClusterTask that runs Kaniko to build and push an image.
- `pipeline.yaml` - Pipeline wiring git-clone -> npm-build -> kaniko-build-push.

Usage (high level):
1. Create a Kubernetes secret with your registry credentials for Quay and mount it into the Kaniko step (see example below).
2. Apply the ClusterTasks and Pipeline to the cluster:

   oc apply -f cluster-task-npm.yaml
   oc apply -f cluster-task-kaniko.yaml
   oc apply -f pipeline.yaml

3. Create a `PipelineRun` or use OpenShift Pipelines UI to start a run. When creating the `PipelineRun`, set pipeline params:
   - `git-url`: https://github.com/Lameckwh/hello-world.git
   - `revision`: main (or your branch)
   - `image`: quay.io/lmbewe/hello-world:v1.0

Kaniko registry secret example (create a dockerconfigjson secret named `quay-secret`):

apiVersion: v1
kind: Secret
metadata:
  name: quay-secret
  annotations:
    tekton.dev/docker-0: https://quay.io
type: kubernetes.io/dockerconfigjson
stringData:
  .dockerconfigjson: |
    {"auths": {"https://quay.io": {"auth": "<BASE64_AUTH>"}}}

Mount the secret into the Kaniko pod by creating a `PipelineRun` that references the service account which has the secret attached, or configure a `tekton.dev/registry` annotation on the service account.

Notes:
- The pipeline uses the `git-clone` Task (ClusterTask) from the Tekton catalog; make sure it is available in your cluster. OpenShift Pipelines typically ships with git-clone available.
- Kaniko requires the docker config at `/kaniko/.docker/config.json`. When creating a `PipelineRun`, set the service account to one that has the `quay-secret` mounted as a secret.
- Adjust Node.js version images in the ClusterTask if you need a different runtime.

