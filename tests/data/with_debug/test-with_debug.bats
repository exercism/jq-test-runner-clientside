#!/usr/bin/env bash
load bats-extra
load bats-jq

@test "double a number" {
  run jq -f with_debug.jq <<< "10"
  assert_success
  assert_output "20"
}

@test "double a string successfully" {
  run jq -f with_debug.jq <<< '"foo"'
  assert_success
  assert_output '"foofoo"'
}

@test "double a string unexpected output" {
  run jq -f with_debug.jq <<< '"foobar"'
  assert_success
  assert_output '"foofoo"'
}

@test "double an object is an error" {
  run jq -f with_debug.jq <<< '{"hello":"world"}'
  assert_failure
  assert_output 'cannot multiply object with number'
}

@test "double an array is an error" {
  run jq -f with_debug.jq <<< "[1,2,3]"
  assert_failure
  assert_output --partial 'array ([1,2,3]) and number (2) cannot be multiplied'
}
