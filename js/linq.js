Array.prototype.Any = function (parClause) {
	if (this.length > 0) {
		var arrayLength = this.length;
		for (var arrayIterator = 0; arrayIterator < arrayLength; arrayIterator++) {
			if (parClause(this[arrayIterator], arrayIterator)) {
				return true;
			}
		}
	}

	return false;
};

Array.prototype.Distinct = function (parClause, parReturnObject) {
	var newList = [], item, arrayLength = this.length, self = this;
	var i, l, leftChain = [], rightChain = [];

	// Via http://stackoverflow.com/a/1144249
	function checkEquality (firstObject, secondObject) {
		var temp;

		// remember that NaN === NaN returns false
		// and isNaN(undefined) returns true
		if (isNaN(firstObject) && isNaN(secondObject) && typeof firstObject === 'number' && typeof secondObject === 'number') {
			return true;
		}

		// Compare primitives and functions.     
		// Check if both arguments link to the same object.
		// Especially useful on step when comparing prototypes
		if (firstObject === secondObject) {
			return true;
		}

		// Works in case when functions are created in constructor.
		// Comparing dates is a common scenario. Another built-ins?
		// We can even handle functions passed across iframes
		if ((typeof firstObject === 'function' && typeof secondObject === 'function') ||
			(firstObject instanceof Date && secondObject instanceof Date) ||
			(firstObject instanceof RegExp && secondObject instanceof RegExp) ||
			(firstObject instanceof String && secondObject instanceof String) ||
			(firstObject instanceof Number && secondObject instanceof Number)) {
			return firstObject.toString() === secondObject.toString();
		}

		// At last checking prototypes as good a we can
		if (!(firstObject instanceof Object && secondObject instanceof Object)) {
			return false;
		}

		if (firstObject.isPrototypeOf(secondObject) || secondObject.isPrototypeOf(firstObject)) {
			return false;
		}

		if (firstObject.constructor !== secondObject.constructor) {
			return false;
		}

		if (firstObject.prototype !== secondObject.prototype) {
			return false;
		}

		// Check for infinitive linking loops
		if (leftChain.indexOf(firstObject) > -1 || rightChain.indexOf(secondObject) > -1) {
			return false;
		}

		// Quick checking of one object beeing a subset of another.
		// todo: cache the structure of arguments[0] for performance
		for (temp in secondObject) {
			if (secondObject.hasOwnProperty(temp) !== firstObject.hasOwnProperty(temp)) {
				return false;
			} else if (typeof secondObject[temp] !== typeof firstObject[temp]) {
				return false;
			}
		}

		for (temp in firstObject) {
			if (secondObject.hasOwnProperty(temp) !== firstObject.hasOwnProperty(temp)) {
				return false;
			} else if (typeof secondObject[temp] !== typeof firstObject[temp]) {
				return false;
			}

			switch (typeof (firstObject[temp])) {
				case 'object':
				case 'function':
					leftChain.push(firstObject);
					rightChain.push(secondObject);

					if (!checkEquality(firstObject[temp], secondObject[temp])) {
						return false;
					}

					leftChain.pop();
					rightChain.pop();
					break;

				default:
					if (firstObject[temp] !== secondObject[temp]) {
						return false;
					}
					break;
			}
		}

		return true;
	}

	for (var arrayIterator = 0; arrayIterator < arrayLength; arrayIterator++) {
		var tempItem = this[arrayIterator];

		var result = newList.Where(function (each) {
			return checkEquality(each, tempItem);
		});

		// !exist
		if (result.length === 0) {
			newList.push(this[arrayIterator]);
		}
	}

	return newList;
};

Array.prototype.First = function () {
	return this[0];
};

Array.prototype.Intersect = function (parSecondArray, parClause) {
	var clauseMethod, secondArray = parSecondArray, result = [], thisArrayLength = this.length, secondArrayLength = parSecondArray.length;

	if (parClause !== void 0) {
		clauseMethod = parClause;
	} else {
		clauseMethod = function (item, index, item2, index2) {
			return item === item2;
		};
	}

	for (var iteratorFirst = 0; iteratorFirst < thisArrayLength; iteratorFirst++) {
		for (var iteratorSecond = 0; iteratorSecond < secondArrayLength; iteratorSecond++) {
			if (clauseMethod(this[iteratorFirst], iteratorFirst, secondArray[iteratorSecond], iteratorSecond)) {
				result[result.length] = this[iteratorFirst];
			}
		}
	}

	return result;
};

Array.prototype.Last = function () {
	return this[this.length - 1];
};

Array.prototype.OrderBy = function (parCriteria) {
	if (parCriteria !== void 0) {
		if (typeof parCriteria === 'string') {
			// Bubble sort
			var swapped, arrayLength = this.length;
			do {
				swapped = false;
				for (var arrayIterator = 0; arrayIterator < arrayLength - 1; arrayIterator++) {
					var x = this[arrayIterator][parCriteria];
					var y = this[arrayIterator + 1][parCriteria];

					if (x > y) {
						var temp = this[arrayIterator];
						this[arrayIterator] = this[arrayIterator + 1];
						this[arrayIterator + 1] = temp;
						swapped = true;
					}
				}
			} while (swapped);
		} else {
			throw 'Invalid Criteria type';
		}
	} else {
		throw 'Criteria required';
	}
};

Array.prototype.OrderByDescending = function (parCriteria) {
	if (parCriteria !== void 0) {
		if (typeof parCriteria === 'string') {
			// Bubble sort
			var swapped, arrayLength = this.length;
			do {
				swapped = false;
				for (var arrayIterator = 0; arrayIterator < arrayLength - 1; arrayIterator++) {
					var x = this[arrayIterator + 1][parCriteria];
					var y = this[arrayIterator][parCriteria];

					if (x > y) {
						var temp = this[arrayIterator + 1];
						this[arrayIterator + 1] = this[arrayIterator];
						this[arrayIterator] = temp;
						swapped = true;
					}
				}
			} while (swapped);
		} else {
			throw 'Invalid Criteria type';
		}
	} else {
		throw 'Criteria required';
	}
};

Array.prototype.Select = function (parFields) {
	if (parFields !== void 0) {
		if (typeof parFields === 'string') {
			var newList = [], arrayLength = this.length, fields = parFields.split(','), fieldsLength = fields.length;

			if (fieldsLength === 1) {
				for (var arrayIterator = 0; arrayIterator < arrayLength; arrayIterator++) {
					var tempObj = {};
					tempObj[fields.First()] = this[arrayIterator][fields.First()]

					newList[newList.length] = tempObj;
				}
			} else {
				for (var arrayIterator = 0; arrayIterator < arrayLength; arrayIterator++) {
					var tempObj = {};

					for (var fieldsIterator = 0; fieldsIterator < fieldsLength; fieldsIterator++) {
						var field = fields[fieldsIterator].trim();

						tempObj[field] = this[arrayIterator][field]
					}

					newList[newList.length] = tempObj;
				}
			}

			return newList;
		} else {
			throw 'Invalid Criteria type';
		}
	} else {
		throw 'Criteria required';
	}
};

Array.prototype.SelectMany = function (parClause) {
	var newList = [], arrayLength = this.length;

	for (var arrayIterator = 0; arrayIterator < arrayLength; arrayIterator++) {
		newList = newList.concat(parClause(this[arrayIterator]));
	}

	return newList;
};

Array.prototype.Skip = function (parCount) {
	return this.Where(function (item, index) {
		return index >= parCount;
	});
};

Array.prototype.Take = function (parCount) {
	return this.Where(function (item, index) {
		return index < parCount;
	});
};

Array.prototype.Where = function (parClause) {
	var newList = [];

	if (this.length > 0) {
		var arrayLength = this.length;
		for (var arrayIterator = 0; arrayIterator < arrayLength; arrayIterator++) {
			if (parClause(this[arrayIterator], arrayIterator)) {
				newList[newList.length] = this[arrayIterator];
			}
		}

		if (newList.length == 1) {
			return newList.First();
		} else {
			return newList;
		}
	} else {
		return newList;
	}
};