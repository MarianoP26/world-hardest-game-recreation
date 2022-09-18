export default [{
  id: 1,
  url: './assets/levels/level1.png',
  playerSpawn: {x: 8, y: 8},
  enemies: 4,
  enemySpeed: 5,
  enemySpawn: [{x: 4, y: 2,}, {x: 15, y: 4}, {x: 4, y: 5}, {x: 15, y: 7}],
  enemyPath: [[{x: 15, y: 2}], [{x: 4, y: 4}], [{x: 15, y: 5}], [{x: 4, y: 7}]],
  coins: [],
},
{
  id: 2,
  url: './assets/levels/level1.png',
  enemies: 4,
  enemySpawn: [{x: 4, y: 2,}, {x: 15, y: 4}, {x: 4, y: 7}, {x: 15, y: 7}],
  coins: [],
}
];