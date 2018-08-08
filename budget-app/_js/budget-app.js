/** ======================
 *  modules for budget app
 */

// -----------------
// Budget Controller
var budgetController = (function(){
    var data = {
        allItems: {
            inc:   [],
            exp:   []
        },
        totals: {
            inc:    0,
            exp:    0
        },
        budget:     0,
        percentage: -1
    };

    var Income = function(id, description, value){
        this.id             = id;
        this.description    = description;
        this.value          = value;
    };

    var Expense = function(id, description, value){
        this.id             = id;
        this.description    = description;
        this.value          = value;
        this.percentage     = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome){
        totalIncome > 0 ? 
        this.percentage = Math.round((this.value / totalIncome) * 100) : this.percentage = -1;
    };

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    };

    var calculateTotal = function(calculationType){
        var sum = 0;

        data.allItems[calculationType].forEach(function(current){
            sum = sum + current.value;
        });
        data.totals[calculationType] = sum;
    };

    return {
        addItem: function(itemType, itemDescription, itemValue){
            var newItem, ID;

            // create new ID (last ID + 1)
            data.allItems[itemType].length > 0 ? 
            ID = data.allItems[itemType][data.allItems[itemType].length - 1].id + 1 : ID = 0;

            // create new item based on Income or Expsense cosntructors
            if (itemType === 'inc') {
                newItem = new Income(ID, itemDescription, itemValue);

            } else if (itemType === 'exp'){
                newItem = new Expense(ID, itemDescription, itemValue);
            }
            data.allItems[itemType].push(newItem);
            return newItem;
        },

        deleteItem: function(type, id){
            var ids, index;

            ids = data.allItems[type].map(function(current){
                return current.id
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function(){

            // calculate totals inc & exp
            calculateTotal('inc');
            calculateTotal('exp');

            data.budget = data.totals.inc - data.totals.exp; // calculate the budget

            // calculate the percentage spent
            data.totals.inc > 0 ? 
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100) : data.percentage = -1;
        },

        calculatePercentages: function(){
            // expense perc = expense/total income * 100 = percentage
            data.allItems.exp.forEach(function(cur){
                cur.calcPercentage(data.totals.inc);
            });
        },

        getBudget: function(){
            return {
                budget:         data.budget,
                totalIncome:    data.totals.inc,
                totalExpenses:  data.totals.exp,
                percentage:     data.percentage
            }
        },

        getPercentages: function(){
            var allPercs = data.allItems.exp.map(function(cur){
                return cur.getPercentage();
            });
            return allPercs;
        },

        publicData: function(){
            return data;
        }
    };

})();

// -------------
// UI Controller
var UIController = (function(){

    var DOMelements = {
        inputType:         '.add__type',
        inputDescription:  '.add__description',
        inputValue:        '.add__value',
        inputBtn:          '.add__btn',

        container:         '.container',
        incomeContainer:   '.income__list',
        expensesContainer: '.expenses__list',

        dateLabel:         '.budget__title--date',
        budgetLabel:       '.budget__value',
        incomeLabel:       '.budget__income--value',
        expensesLabel:     '.budget__expenses--value',
        percentageLabel:   '.budget__expenses--percentage',
        expPercLabel:      '.item__percentage'
    };

    // private function no longer needed now formatNumber is in place
    // var round2Dec = function(number, precision){
    //     var factor = Math.pow(10, precision);
    //     return Math.round(number * factor) / factor;
    // };

    var formatNumber = function(num, type){
        var numSplit, numInt, numDec, type;

        num         = Math.abs(num);
        num         = num.toFixed(2);
        numSplit    = num.split('.');
        numInt      = numSplit[0];
        numDec      = numSplit[1];

        if (numInt.length > 3) numInt = numInt.substr(0, numInt.length - 3) + ',' + numInt.substr(numInt.length - 3, 3);

        return (type === 'exp' ? '-' : '+') + ' £' + numInt + '.' + numDec;
    };

    var nodeListForEach = function(list, func){
        for (var i = 0; i < list.length; i++) {
            func(list[i], i);
        }
    };

    return {

        getInput: function(){
            return {
                inputType:        document.querySelector(DOMelements.inputType).value,
                inputDescription: document.querySelector(DOMelements.inputDescription).value,
                inputValue:       parseFloat(document.querySelector(DOMelements.inputValue).value)
            };
        },

        addListItem: function(obj, listType){
            var html, outputHTML;

            // create HTML string with placeholder
            if (listType === 'inc') {
                element = DOMelements.incomeContainer;

                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            } else if (listType === 'exp'){
                element = DOMelements.expensesContainer;

                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // replace the placeholder with actual data
            outputHTML = html.replace('%id%', obj.id);
            outputHTML = outputHTML.replace('%description%', obj.description);
            outputHTML = outputHTML.replace('%value%', formatNumber(obj.value, listType));

            document.querySelector(element).insertAdjacentHTML('beforeend', outputHTML); // insert HTML into DOM
        },

        deleteListItem : function(selectorID){
            var element = document.getElementById(selectorID);

            element.parentNode.removeChild(element);
        },

        clearFields: function(){
            var fields, fieldsArr;

            fields      = document.querySelectorAll(DOMelements.inputDescription + ', ' + DOMelements.inputValue);
            fieldsArr   = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array){
                current.value = "";
            });
            fieldsArr[0].focus();
        },

        displayBudget: function(obj){
            var type;
            obj.budget >= 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMelements.budgetLabel).textContent   = formatNumber(obj.budget, type);            
            document.querySelector(DOMelements.incomeLabel).textContent   = formatNumber(obj.totalIncome, 'inc');
            document.querySelector(DOMelements.expensesLabel).textContent = formatNumber(obj.totalExpenses, 'exp');

            obj.percentage > 0 ?
            document.querySelector(DOMelements.percentageLabel).textContent = obj.percentage + '%' :
            document.querySelector(DOMelements.percentageLabel).textContent = '--';
        },

        displayPercentages: function(percentages){
            var fields = document.querySelectorAll(DOMelements.expPercLabel);

            nodeListForEach(fields, function(cur, index){
                percentages[index] > 0 ?
                cur.textContent = percentages[index] + '%' : cur.textContent = '--';
            });
        },

        displayDate: function(){
            var now, month, months, year;

            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            now     = new Date();
            month   = now.getMonth();
            year    = now.getFullYear();

            document.querySelector(DOMelements.dateLabel).textContent = months[month] + ', ' + year;
        },

        typeChange: function(){
            var fields = document.querySelectorAll(
                DOMelements.inputType + ',' + 
                DOMelements.inputDescription + ',' + 
                DOMelements.inputValue
            );
            nodeListForEach(fields, function(cur){
                cur.classList.toggle('red-focus');
            });
            document.querySelector(DOMelements.inputBtn).classList.toggle('red');
        },

        getDOMelements: function(){
            return DOMelements;
        }
    };

})();

// -----------------------------
// Global Application Controller
var appController = (function(budgetCtrl, UICtrl){
    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMelements();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(evt){
            if(event.keyCode === 13 || event.which === 13) {
                evt.preventDefault();
                ctrlAddItem();
            }
        });
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.typeChange);
    };

    var updateBudget = function () {
        
        budgetCtrl.calculateBudget(); // calculate budget
        
        var budget = budgetCtrl.getBudget(); // return the budget
        
        UICtrl.displayBudget(budget); // display budget in UI
    };

    var updatePercentages = function () {
        
        budgetCtrl.calculatePercentages(); // calculate percentage
        
        var percentages = budgetCtrl.getPercentages(); // read percentages from budget
        
        UICtrl.displayPercentages(percentages); // update UI with new percentages
    };

    var ctrlAddItem = function(){
        var input, newItem;

        input = UICtrl.getInput(); // get field input data

        if(input.inputDescription !== '' && !isNaN(input.inputValue) && input.inputValue > 0){

            newItem = budgetCtrl.addItem(input.inputType, input.inputDescription, input.inputValue); // add to budget
            
            UICtrl.addListItem(newItem, input.inputType); // add item to UI
            
            UICtrl.clearFields(); // clear fields
            
            updateBudget(); // calculate and update budget
            
            updatePercentages(); // calculate and update percentages
        }

    };

    var ctrlDeleteItem = function(evt){
        var itemID, splitID, type, ID;

        itemID = evt.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {
            splitID = itemID.split('-');
            type    = splitID[0];
            ID      = parseInt(splitID[1]);

            budgetCtrl.deleteItem(type, ID); // delete from data structure
            
            UICtrl.deleteListItem(itemID); // delete from UI
            
            updateBudget(); // update & display new budget
            
            updatePercentages(); // update percentages
        }
    };

    return {
        init: function(){
            console.log('application startup successful');
            UICtrl.displayDate();
            UICtrl.displayBudget({
                budget:         0,
                totalIncome:    0,
                totalExpenses:  0,
                percentage:    -1
            });
            setupEventListeners();
        }
    }

})(budgetController, UIController);

appController.init();