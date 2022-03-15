case $1 in
"build" )
  ./scripts/visual-tests/build.image.sh ;;
"local" )
  echo "Local test run"
  ./scripts/visual-tests/run.tests.sh ;;
*)
  echo "Docker test run"
  docker run -it --name vivid-visual-tests --env task=$1 --rm -v $PWD:/usr/src/app vivid-visual-tests-img
esac
