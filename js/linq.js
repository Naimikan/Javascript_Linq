(function (window, undefined) {
	Array.prototype.Where = function (parClause) {
		var newList = [], arrayCount = this.length;
		
		for (var arrayIterator = 0; arrayIterator < arrayCount; arrayIterator++) {
			if (parClause.apply(this[arrayIterator], [this[arrayIterator], arrayIterator])) {
				newList[newList.length] = this[arrayIterator];
			}
		}
		
		return newList;
	};

	Array.prototype.Any = function (parClause) {
	    for (var arrayIterator = 0; arrayIterator < this.length; arrayIterator++) {
	        if (parClause.apply(this[arrayIterator], [this[arrayIterator], arrayIterator])) {
				return true;
			}
	    }

	    return false;
	};

	Array.prototype.Select = function (parClause) {
		var newList = [];

		for (var arrayIterator = 0, length = this.length; arrayIterator < length; arrayIterator++) {
			if(parClause(this[arrayIterator])) {
				newList[newList.length] = parClause(this[arrayIterator]);
			}
		}

		return newList;
	};

	Array.prototype.SelectMany = function (parClause) {
		var newList = [];

		for (var arrayIterator = 0, length = this.length; arrayIterator < length; arrayIterator++) {
			newList = newList.concat(parClause(this[arrayIterator]));
		}

		return newList;
	};

	Array.prototype.OrderBy = function (parClause) {
		this.sort(function (first, second) {
	        var x = parClause.apply(first, [first]), y = parClause.apply(second, [second]);
	        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	    });
	};

	Array.prototype.OrderByDescending = function (parClause) {
		this.sort(function (first, second) {
			var x = parClause.apply(second, [second]), y = parClause.apply(first, [first]);
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		});
	};

	Array.prototype.Distinct = function (parClause, parReturnObject) {
		var newList = [], item, distinct = {};

	    for (var arrayIterator = 0; arrayIterator < this.length; arrayIterator++) {
	        item = parClause.apply(this[arrayIterator], [this[arrayIterator]]);
	        if (distinct[item] == void 0) {
	            distinct[item] = true;

	            if (parReturnObject) {
	            	newList.push(this[arrayIterator]);
	            } else {
	            	newList.push(item);
	            }
	        }
	    }

	    distinct = null;
	    return newList;
	};

	Array.prototype.Intersect = function (parSecondArray, parClause) {
		var clauseMethod, secondArray = parSecondArray, result = [];
		if (parClause != void 0) {
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

	Array.prototype.First = function () {
		return this[0];
	};

	Array.prototype.Last = function () {
		return this[this.length - 1];
	};

	Array.prototype.Take = function (parCount) {
		return this.Where(function (item, index) {
			return index < parCount;
		});
	};

	Array.prototype.Skip = function (parCount) {
		return this.Where(function (item, index) {
			return index >= parCount;
		});
	};
})(window);