npx http-server "$1" -p 8080 -s &
shift 1 # remove the first argument

npx playwright test -c "$@"
status=$?

pkill -f http-server

exit $status
