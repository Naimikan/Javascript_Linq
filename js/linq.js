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

//Array.prototype.Distinct = function () {
	/*var newList = [], arrayLength = this.length;

	for (var arrayIterator = 0; arrayIterator < arrayLength; arrayIterator++) {
		if (this.indexOf(this[arrayIterator]) == arrayIterator) {
			newList.push(this[arrayIterator]);
		}
	}

	return newList;*/

	/*return this.filter(function (item, pos, self) {
	    return self.indexOf(item) == pos;
	});*/

	/*return this.filter(function (s, i, a) {
		return i == a.lastIndexOf(s); 
	});*/
//};

// Pobema
/*Array.prototype.Distinct = function (parClause, parReturnObject) {
	var newList = [], item, arrayLength = this.length;

	var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different, objects are not equivalent

    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal, objects are not equivalent
        if (a[propName] !== b[propName]) {
           return false;
        }
    }

	

	for (var arrayIterator = 0; arrayIterator < arrayLength; arrayIterator++) {
		item = parClause.call(this[arrayIterator], this[arrayIterator]);
		if (distinct[item] === void 0) {
			distinct[item] = true;

			if (parReturnObject) {
				newList[arrayIterator] = this[arrayIterator];
			} else {
				newList[arrayIterator] = item;
			}
		}
	}

	distinct = null;
	return newList;
};*/

Array.prototype.First = function () {
	return this[0];
};

Array.prototype.Intersect = function (parSecondArray, parClause) {
	var clauseMethod, secondArray = parSecondArray, result = [];

	if (parClause !== void 0) {
		clauseMethod = parClause;
	} else {
		clauseMethod = function (item, index, item2, index2) {
			return item === item2;
		};
	}

	for (var iteratorFirst = 0; iteratorFirst < this.length; iteratorFirst++) {
		for (var iteratorSecond = 0; iteratorSecond < secondArray.length; iteratorSecond++) {
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