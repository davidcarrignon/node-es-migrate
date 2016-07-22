var indexName = 'common';

exports.up = function (client, callback) {
	client.indices.create({
			index: indexName
		}, callback)	;
};

exports.down = function (client, callback) {
	client.indices.delete({
			index: indexName
		}, callback)	;
};