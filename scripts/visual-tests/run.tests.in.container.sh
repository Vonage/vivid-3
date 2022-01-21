echo $1
if [ $1 = "build" ]
then
  ./scripts/visual-tests/build.image.sh
else
  docker run -it --name vivid-visual-tests --env update=$1 --rm -v $PWD:/usr/src/app vivid-visual-tests-img
fi
