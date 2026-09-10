#!/usr/bin/env bats
load bats-extra

@test "jq syntax error" {
    run jq -f script.jq < /dev/null
    assert_success
}
