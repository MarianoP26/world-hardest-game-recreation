export default [{
  id: 1,
  url: './assets/levels/level1.png',
  playerSpawn: {x:2,y:5},
  enemies: 4,
  enemySpawn: [{x:4,y:3,s:5},{x:15,y:5,s:5},{x:4,y:4,s:5},{x:15,y:6,s:5}],
  enemyPath: [[{x:15,y:2}],[{x:4,y:4}],[{x:15,y:5}],[{x:4,y:7}]],
  coins: [],
  width: 20,
},
{
  id: 2,
  url: './assets/levels/level2.png',
  playerSpawn: {x:2,y:2},
  checkpoints: [{x:2,y:6},],
  enemies: 16,
  enemySpawn: [{x:18,y:1,s:3},{x:16,y:14,s:7},{x:14,y:5,s:5},{x:13,y:5,s:5},{x:11,y:14,s:5},{x:12,y:14,s:5},{x:10,y:5,s:5},{x:9,y:5,s:5},{x:7,y:14,s:5},{x:8,y:14,s:5},{x:6,y:5,s:5},{x:5,y:5,s:5},{x:3,y:18,s:7},{x:1,y:17,s:3},{x:15,y:16,s:3},{x:15,y:18,s:3}],
  enemyPath: [[{x:16,y:3},{x:14,y:1},{x:12,y:3},{x:10,y:1},{x:8,y:3},{x:6,y:1},{x:4,y:3},{x:6,y:1},{x:8,y:3},{x:10,y:1},{x:12,y:3},{x:14,y:1},{x:16,y:3}],[{x:16,y:1}],[{x:14,y:14}],[{x:13,y:14}],[{x:11,y:5}],[{x:12,y:5}],[{x:10,y:14}],[{x:9,y:14}],[{x:7,y:5}],[{x:8,y:5}],[{x:6,y:14}],[{x:5,y:14}],[{x:3,y:8}],[{x:15,y:17}],[{x:1,y:16}],[{x:1,y:18}]],
  coins: [],
  width: 20,
},
{
  id: 3,
  url: './assets/levels/level3.png',
  playerSpawn: {x:17,y:1},
  checkpoints: [{x:1,y:8},],
  enemies: 11,
  enemySpawn: [{x:3,y:1,s:5},{x:5,y:1,s:5},{x:7,y:1,s:5},{x:9,y:1,s:5},{x:11,y:1,s:5},{x:13,y:1,s:5},{x:4,y:13,s:5},{x:6,y:13,s:5},{x:8,y:13,s:5},{x:10,y:13,s:5},{x:12,y:13,s:5},],
  enemyPath: [[{x:3,y:13}],[{x:5,y:13}],[{x:7,y:13}],[{x:9,y:13}],[{x:11,y:13}],[{x:13,y:13}],[{x:4,y:1}],[{x:6,y:1}],[{x:8,y:1}],[{x:10,y:1}],[{x:12,y:1}],],
  coins: [{x:18,y:12},{x:18,y:13}],
  width: 20,
},
{
  id: 4,
  url: './assets/levels/level4.png',
  playerSpawn: {x:13,y:7},
  checkpoints: [{x:1,y:1},],
  enemies: 9,
  enemySpawn: [{x:4,y:4,s:3},{x:3,y:1,s:5},{x:1,y:3,s:5},{x:1,y:10,s:7},{x:4,y:6,s:5},{x:13,y:11,s:6},{x:16,y:4,s:3},{x:18,y:4,s:3},{x:17,y:13,s:3}],
  enemyPath: [[{x:13,y:4},{x:13,y:1},{x:14,y:1},{x:14,y:4}],[{x:12,y:1},{x:12,y:2},{x:3,y:2}],[{x:2,y:3},{x:2,y:13},{x:1,y:13}],[{x:14,y:10},{x:14,y:13},{x:1,y:13}],[{x:11,y:6},{x:11,y:8},{x:4,y:8}],[{x:13,y:12},{x:2,y:12},{x:2,y:11}],[{x:16,y:13}],[{x:18,y:13}],[{x:17,y:4}]],
  coins: [],
  width: 20,
},
{
  id: 5,
  url: './assets/levels/level5.png',
  playerSpawn: {x:2,y:5},
  enemies: 17,
  enemySpawn: [{x:4,y:1,s:1},{x:5,y:1,s:2},{x:6,y:1,s:5},{x:7,y:1,s:1},{x:8,y:1,s:2},{x:9,y:1,s:5},{x:10,y:1,s:1},{x:11,y:1,s:2},{x:12,y:1,s:5},{x:13,y:1,s:1},{x:14,y:1,s:2},{x:15,y:1,s:5},{x:16,y:1,s:1},{x:17,y:1,s:2},{x:18,y:1,s:5},{x:19,y:1,s:1},{x:20,y:1,s:2}],
  enemyPath: [[{x:4,y:6}],[{x:5,y:6}],[{x:6,y:6}],[{x:7,y:6}],[{x:8,y:6}],[{x:9,y:6}],[{x:10,y:6}],[{x:11,y:6}],[{x:12,y:6}],[{x:13,y:6}],[{x:14,y:6}],[{x:15,y:6}],[{x:16,y:6}],[{x:17,y:6}],[{x:18,y:6}],[{x:19,y:6}],[{x:20,y:6}]],
  coins: [{x:4,y:6},{x:20,y:1}],
  width: 25,
},
{
  id: 6,
  url: './assets/levels/level6.png',
  playerSpawn: {x:1,y:7},
  checkpoints: [],
  enemies: 7,
  enemySpawn: [{x:1,y:6,s:7},{x:8,y:1,s:5},{x:8,y:13,s:6},{x:1,y:12,s:5},{x:1,y:9,s:4},{x:4,y:5,s:4},{x:1,y:9,s:4}],
  enemyPath: [[{x:1,y:1},{x:2,y:1},{x:2,y:6}],[{x:8,y:2},{x:1,y:2},{x:1,y:1}],[{x:7,y:13},{x:7,y:1},{x:8,y:1}],[{x:8,y:12},{x:8,y:13},{x:1,y:13}],[{x:5,y:9},{x:5,y:10},{x:1,y:10}],[{x:5,y:5},{x:5,y:10},{x:4,y:10}],[{x:2,y:9},{x:2,y:13},{x:1,y:13}]],
  coins: [],
  width: 10,
},
{
  id: 7,
  url: './assets/levels/level7.png',
  playerSpawn: {x:5,y:4},
  checkpoints: [],
  enemies: 5,
  enemySpawn: [{x:3,y:6,s:9},{x:1,y:1,s:2},{x:8,y:8,s:2},{x:1,y:6,s:2},{x:8,y:3,s:2}],
  enemyPath: [[{x:3,y:3},{x:6,y:3},{x:6,y:6},{x:3,y:6},{x:3,y:8},{x:1,y:8},{x:1,y:1},{x:8,y:1},{x:8,y:8},{x:3,y:8}],[{x:8,y:1},{x:8,y:8},{x:1,y:8}],[{x:8,y:1},{x:1,y:1},{x:1,y:8}],[{x:6,y:1}],[{x:3,y:8}]],
  coins: [],
  width: 11,
},

];