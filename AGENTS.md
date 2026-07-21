
##IRCL

Idaho Robot Combat League official website

## Agent memory

This repo has a persistent agent memory in the TTDB format specified by
`agent-memory-system_ttdb.md`. The store is `meet_ttdb.md` (umwelt: meet
operations). Read it at the start of meet-related work; append or revise
records rather than rewriting them (IDs never change — a changed
understanding is a new record with a `revises` edge). `meets.html` is the
live match-control loop: it reads the store's outcome lane (lat 60) on
load and its Export TTDB button downloads the store with new match outcome
records appended; committing that export back to the repo is the
consolidation step. The current objective lives at `@LAT20LON1` in the
store — its EPS marks what to work on next.




