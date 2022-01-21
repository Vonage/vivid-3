npm run build components
alias npmenv='npm run env -- $SHELL'
if [ $update = "update" ]
then
  npmenv http-server -s & npmenv playwright test --update-snapshots
else
  npmenv http-server -s & npmenv playwright test
fi

