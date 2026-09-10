#!/usr/bin/env bats
load bats-extra

@test "jq v1.7 syntax test" {
    run jq -r -f script.jq <<< '42'
    assert_success
    assert_output $'OK\n42'
}
