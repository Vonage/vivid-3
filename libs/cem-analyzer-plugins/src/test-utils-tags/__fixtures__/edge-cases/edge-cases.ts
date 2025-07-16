/**
 * @testSelector empty
 * @testSelector   spaced   
 * @testAction singleArg arg1
 * @testAction multipleArgs arg1 arg2 arg3
 * @testQuery backtickSingle `single backtick arg`
 * @testQuery backtickMultiple `first arg` `second arg` normalArg
 * @testQuery mixedSpacing  arg1   `spaced backtick`   arg2  
 * @testRef complexCase element `shadow .complex > selector` method `another arg`
 * @testRef emptyBackticks ``
 * @testRef unbalancedStart `unbalanced
 * @testRef unbalancedEnd unbalanced`
 */
export class EdgeCasesComponent extends HTMLElement {}
