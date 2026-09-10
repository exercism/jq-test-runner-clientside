#!jq
# `else` is optional in v1.7
(if . < 50 then "OK" end),
(if . > 50 then "OK" end)
