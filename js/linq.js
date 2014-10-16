Array.prototype.Any = function (parClause) {
	if (this.length > 0) {
		var arrayLength = this.length;
		for (var arrayIterator = 0; arrayIterator < arrayLength; arrayIterator++) {
			if (parClause.call(this[arrayIterator], this[arrayIterator], arrayIterator)) {
				return true;
			}
		}
	}

	return false;
};

Array.prototype.Distinct = function (parClause, parReturnObject) {
	var newList = [];
	var item;
	var distinct = {};

	for (var arrayIterator = 0; arrayIterator < this.length; arrayIterator++) {
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
};

Array.prototype.First = function () {
	return this[0];
};

Array.prototype.Intersect = function (parSecondArray, parClause) {
	var clauseMethod
	var secondArray = parSecondArray;
	var result = [];

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
	// Bubble sort
	var swapped, arrayLength = this.length;
	do {
		swapped = false;
		for (var arrayIterator = 0; arrayIterator < arrayLength - 1; arrayIterator++) {
			var x = parCriteria.call(this[arrayIterator], this[arrayIterator]);
			var y = parCriteria.call(this[arrayIterator + 1], this[arrayIterator + 1]);

			if (x > y) {
				var temp = this[arrayIterator];
				this[arrayIterator] = this[arrayIterator + 1];
				this[arrayIterator + 1] = temp;
				swapped = true;
			}
		}
	} while (swapped);
};

Array.prototype.OrderByDescending = function (parCriteria) {
	// Bubble sort
	var swapped, arrayLength = this.length;
	do {
		swapped = false;
		for (var arrayIterator = 0; arrayIterator < arrayLength - 1; arrayIterator++) {
			var x = parCriteria.call(this[arrayIterator + 1], this[arrayIterator + 1]);
			var y = parCriteria.call(this[arrayIterator], this[arrayIterator]);

			if (x > y) {
				var temp = this[arrayIterator + 1];
				this[arrayIterator + 1] = this[arrayIterator];
				this[arrayIterator] = temp;
				swapped = true;
			}
		}
	} while (swapped);
};

Array.prototype.Select = function (parClause) {
	var newList = [], arrayLength = this.length;

	for (var arrayIterator = 0; arrayIterator < arrayLength; arrayIterator++) {
		if(parClause(this[arrayIterator])) {
			newList[newList.length] = parClause(this[arrayIterator]);
		}
	}

	return newList;
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
			if (parClause.call(this[arrayIterator], this[arrayIterator], arrayIterator)) {
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