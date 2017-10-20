# Redux Schema via Runtypes

This gist introduces a redux middleware that checks the redux store against a configured runtype object tree. This is useful because it occurs after all reducers have run and as a result validates the final state as opposed to state represented by a dispatched action (pre-reducer).