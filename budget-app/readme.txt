==========
BUDGET APP
==========

Things to note/play around with

1. When you change the Type using the select field (+/-) you should get a change in colour for the focus and the button

2. When you add either expenses or incomes the totals will be auto generated in the top section of the page

3. when entering a value the input fields get cleared and focus returns to the description field for quick repeated input of the next value

4. validation prevents submission of a value unless both a description and a number value have been entered

5. The total expenses will also show a percentage of the total income regardless of whether you have more expenses than income

6. the individual expenses show a percentage of the total income

7. all percentages including the individual ones will auto update whenever an income is removed or added

8. the total percentage at the top will auto update when either an income or an expense is removed or added

9. if you use the console in the browser dev tools you will see that the javascript also creates unique IDs for each created element based on the value of the last one created + 1 in order to avoid the creation of duplicate values

10. everything uses Modular Patterns, a parent data object, a main initialiser function, prototypal inheritence for object method creation, interconnected modules for easy expansion or use of modules in other applications, refactoring throughout for the cleanest possible code so take a read through the javascript