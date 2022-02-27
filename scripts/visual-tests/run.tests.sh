npm run build components
alias npmenv='npm run env -- $SHELL'
arg=$([ -n "$task" ] && echo "$task" || echo "5")
echo $arg
case $arg in
"update")
  echo "Testing snapshots"
  npx http-server -s &
  npx playwright test --update-snapshots -c ./libs/components/playwright.config.ts
  ;;
*)
  echo "Updating snapshots"
  npx http-server -s &
  npx playwright test -c ./libs/components/playwright.config.ts
  ;;
esac
