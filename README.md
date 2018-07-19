# HTML Chatbot
*This is the HTML Chatbot, you can have multiple people take attendence on this chatbot! There are admin(ones that can edit the row,column, summation headers and groups) and there are users that input attendance*
![Alt-text](https://github.com/Geraldcdx/HTMLChatbot/blob/master/Chatbot.png)

### This is written using google spreadsheets in google app script(GAS). Here is a link that can help you set it up and understand GAS.
https://www.youtube.com/watch?v=bwU1MSLi33Q
### This is simple to deploy with no cost and can be done through the video above.

## Users:
  * Users just need to know their user password and group that they are taking attendance for. The users will be getting a list of groups from the admin
  * Users just need to follow the prompting and instructions
  
## Admin:
 * The admin's job is complicated yet versitile
 * Below will have a list of commands that the admin can use to customise your attendance

### Important Instructions:
 * For first time users of this bot, you need to use the clearSubs/clearSums/clearRows/clearHeaders first to intialise all the properties from the properties service library in google app script
 * In the event any bug happens just do the clearSubs/clearSums/clearRows/clearHeaders commands to get rid of the bug. The bugs tend to be from the way google app script is built
 * The admin interacts with 4 groups: rows, headers, summation headers and groups. This will be elaborated below

#### Understanding of groups:
 1) Rows - These are the groups that you are adding to. For example, Group1, Group2 etc. However, when you add them you will prompt an association. The association is to determine the subgroup. Which in the case above in the picture is Group1 belongs to subgroup "one" and Group2 belongs to subgroup "two". If you want just one subgroup, just put the company name.
 2) Headers - These are to determine the types of people in each group. For example, Group1 has workers, coders and managers.
 3) Subgroups - Theses are the "one" and "two" seen in the above picture. Basically, they can group different departments together.
 4) Summation headers - These are custom headers that you can set. if you create a summation header of managers and another summation header of workers and coders, the bot will display it as Managers + (workers+coders) as seen above in the picture.
<br>**Important: always use #confirm after inputting everything, because it shows you the result and allows me to run more efficient code.**


### Admin commands on the chatbot:
<br>4 Groups that you need to understand:<br>Headers - The top columns<br>
Rows - The values for the left column<br>SubGroups- To divide the total attendance, if there is no association just put nil<br>
Summation Headers - You can customise the sum of headers you want from the given input headers.
Commands:<br>#addHeader (insert header) - to input a new header <br>#delHeader (insert header) - to delete a header<br>
#headers - to view all the headers that you have set<br>#addRow (insert row) - inserts row <br>#delRow (insert row) - deletes row<br>
#rows - views all the rows you've set<br>#table - views everything in a table-like format<br>
#addSum (insert summation header here) - adds summation header<br>#delSum - deletes the previous summation header inputted<br>
#sum - views all the summation headers<br>#addSub (insert subgroup) - adds a subgroup<br>#delSub - deletes the previous subgroup inputted<br>
#sub - show you all the subgroups created<br>#confirm - sets all the headers and rows to be used for users<br>
#clearSubs/clearSums/clearRows/clearHeaders - use to clear any of the items, use when there is a error/bug<br>
#Attendance (you can add words here and it will display on your total) - Sends you a message on all the inputted attendance<br><br>

# Personalise Code
## Here is where you change the password for admin and user(to prevent other people from access your sheet):
![Alt-Text](https://github.com/Geraldcdx/HTMLChatbot/blob/master/admins.png)
## Here is where you change the spreadsheet you have created:
![Alt-Text](https://github.com/Geraldcdx/HTMLChatbot/blob/master/idss.png)

