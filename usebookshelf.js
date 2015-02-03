var env = process.env.NODE_ENV || 'development';
var knexConfig = require('./knexfile.js')[env];
var knex = require('knex')(knexConfig);
var bookshelf = require('bookshelf')(knex);
var Promise = require('bluebird');

//In order to work with objects (multiple values to insert),
//you need to use Collections

var Country = bookshelf.Model.extend({
  tableName: 'countries'
});

var City = bookshelf.Model.extend({
	tableName: 'cities'
});

var c_id;

Country.forge({ name: 'Sweden' }).save().then(function(country) {
	Country.where({name:'Sweden'}).fetch().then(function(result){
		c_id = result.get('id');
		City.forge({ name: 'Springfield', country_id: c_id}).save().then(function(city) {
			console.log('created a city %j', city.toJSON());
		})
		.done();
	})
	.done();
})
.done();