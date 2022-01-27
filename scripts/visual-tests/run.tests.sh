npm run build components
alias npmenv='npm run env -- $SHELL'
update=$([ -n "$update" ] && echo "$update" || echo "5")
if [ "update" != $update ]; then
    echo "Testing snapshots"
    npx http-server -s & npx playwright test
else
    echo "Updating snapshots"
    npx http-server -s & npx playwright test --update-snapshots
fi

