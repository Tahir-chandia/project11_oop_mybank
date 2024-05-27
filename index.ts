#! /usr/bin/env node

import inquirer from "inquirer";

//Bank account interface

interface BankAccount{
    accountNumber:number
    balance:number
    deposit(amount:number):void
    withdrawl(amount:number):void
    checkBalance():void
}

//Bank account class

class BankAccounk implements BankAccounk{
    accountNumber:number
    balance:number

    constructor(accoun:number,bal:number){
        this.accountNumber=accoun
        this.balance=bal
    }

    //Debit money

    withdrawl(amount:number):void{
        if(this.balance >= amount){
            this.balance -= amount
            console.log(`Withdrawl of $${amount} successfull. Your remaining balance is $${this.balance}`);
        }else{
            console.log("Insufficient balance.");
            
        } }

        //Credit money

        deposit(amount:number):void{

            if(amount> 100){
            amount -= 1;// $1 fee charged for more than $100 deposited
        }this.balance += amount
        console.log(`Deposit of $${amount} successfull. Your remaining balance is $${this.balance}`);
        }

    //Check Balance

    checkBalance():void{
        console.log(`Your current balance is $${this.balance}`);
        
    }
}

//Customer class

class Customer {
    firstName:string
    lastName:string
    gender:string
    age:number
    mobileNumber:number
    account:BankAccounk


    constructor(fname:string,lName:string,g:string,a:number,m:number,acc:BankAccounk){
        this.firstName=fname
        this.lastName=lName
        this.gender=g
        this.age=a
        this.mobileNumber=m
        this.account=acc
    }
}

//Create bank accounts


const accounts:BankAccounk[]=[
     new BankAccounk(1005,500),
     new BankAccounk(1006,1000),
     new BankAccounk(1007,1500)
]

//Create customers

    const customer:Customer[]=[
    new Customer("Tahir","Khan","Male",32324321,975133,accounts[0]),
    new Customer("Sajid","Khan","Male",322345621,94347654,accounts[1]),
    new Customer("Rahib","Ali","Male",323452321,973346,accounts[2])]

    //Function to interact with bank accounts
    
    async function services(){

        while(true){
            const userInput=await inquirer.prompt({
                name:"accountNumber",
                type:"number",
                message:"Enter your account Number:"
            })

            const user = customer.find(customer=>customer.account.accountNumber==userInput.accountNumber)

            if(user){
                console.log(`Welcome ${user.firstName} ${user.lastName}`);

                const ans = await inquirer.prompt({
                    name:"select",
                    type:"list",
                    message:"Select an operation.",
                    choices:["Deposit","Withdraw","Check balance","Exit"]
                })

     switch (ans.select) {
         case "Deposit":
          const depAmount = await inquirer.prompt({
           name:"amount",
           type:"number",
           message:"Enter amount to deposit?"
              })
            user.account.deposit(depAmount.amount)
              break;
                           
           case "Withdraw":
              const withAmount = await inquirer.prompt({
               name:"amount",
               type:"number",
                message:"Enter amount to withdraw?"
                        })
                  user.account.withdrawl(withAmount.amount)
                     break;

          case "Check balance":
             user.account.checkBalance()
              break;

           case "Exit":
             console.log("Exiting bank program.....");
             console.log("\nThanks for using our bank services. Have a good day!");
              return }}else{console.log("Invalid account number . Please try again");
                                } }}

services()