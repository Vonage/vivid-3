case $1 in
"build" )
  ./scripts/visual-tests/build.image.sh ;;
"local" )
  ./scripts/visual-tests/run.tests.sh ;;
*)
  docker run -it --name vivid-visual-tests --env update=$1 --rm -v $PWD:/usr/src/app vivid-visual-tests-img
esac
