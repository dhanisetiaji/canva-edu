const puppeteer = require('puppeteer')
const delay =require('delay');
const moment = require('moment');
const COLORS = require("./lib/colors");
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const chalk = require('chalk');
const fs = require('fs');
const readlineSync = require('readline-sync');

const emailURL = "https://10minutesemail.net/"
const daftarCanva = "https://www.canva.com/id_id/signup/?signupRedirect=%2Fedu-signup&loginRedirect=%2Fedu-signup&brandingVariant=edu"
const openEdu = "https://www.canva.com/edu-signup"
// https://www.canva.com/edu-signup


async function removeEmailAddress(page) {
    await page.$eval("button[id='deleteEmailAddress']", elem => elem.click())
}




(async () => {
    // const delayfind = readlineSync.question("Input delay for find email(1sec = 1000): ")

    try{
        console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgMagenta, `Bot Started, Wait....`, COLORS.Reset);
        const browser = await puppeteer.launch({ headless: false })
        const page = await browser.newPage();
        await page.goto(emailURL,{waitUntil: 'load'})
        const page1 = await browser.newPage();
        await page1.goto(daftarCanva,{waitUntil: 'load'})
        await page.bringToFront();
        console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `=> Find email EDU + Delay`, COLORS.Reset);
        while (true) {
            await delay(7000) 
            var getemail = await page.evaluate(() => {
                let emailvalue = document.querySelector('input[id="tempEmailAddress"]').value;
                return emailvalue
            })
            if(getemail.split('@')[1] !== "email.edu.pl"){
                await removeEmailAddress(page)
                console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgRed, `=> ${getemail}`, COLORS.Reset);
            }else{
                console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `=> Found Email: ${getemail}`, COLORS.Reset);
                await page1.bringToFront();
                // await delay(3000);
                // await page1.waitForSelector('._38oWvQ',{timeout:5000}).catch(() => console.log('Class N3ewq doesn\'t exist!'));
                await page1.evaluate(() => document.querySelectorAll("._38oWvQ")[10].click())
                // await page1.$eval("button[class='_38oWvQ'][10]", elem => elem.click())
                // await page1.click("._38oWvQ")[10]
                await page1.type('#__a11yId13', 'Dhani Setiaji')
                await page1.type('#__a11yId16', getemail)
                await page1.type('#__a11yId19', 'DhaniGanteng123')
                console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `=> Regist to Canva`, COLORS.Reset);
                await page1.evaluate(() => document.querySelectorAll("._38oWvQ")[7].click())
                // await page1.click("._38oWvQ")[7]
                console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `=> Done`, COLORS.Reset);
                console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `=> Delay 20sec, Get Verify Email`, COLORS.Reset);
                await page.bringToFront();
                await delay(20000);
                await page.goto("https://10minutesemail.net/email?id=1",{waitUntil: 'load'})
                await delay(5000);
                await page.reload();
                // await page.waitForSelector('.wrapper-margin',{timeout:5000}).catch(() => console.log('Class N3ewq doesn\'t exist!'));
                const tet = await page.evaluate(() => document.querySelectorAll(".wrapper-margin")[2].textContent)
                console.log(tet);
                // if(document.querySelector('.wrapper-typography.title').textContent.split(" ")[0] == true){
                //     const kode = document.querySelector('.wrapper-typography.title').textContent.split(" ")[0];
                //     // s-JGcg fFOiLQ fP4ZCw T9BsEA CItIxQ RX42Sw
                //     await page1.type('input[class="s-JGcg fFOiLQ fP4ZCw T9BsEA CItIxQ RX42Sw"]', kode)
                //     await page1.evaluate(() => {
                //         document.querySelectorAll("._38oWvQ")[7].click();
                //     })

                // }else{
                //     await page1.evaluate(() => {
                //         document.querySelectorAll(".wrapper-margin")[2].click();
                //     })
                // }
                await delay(5000);
                const page2 = await browser.newPage();
                await page2.goto(daftarCanva,{waitUntil: 'load'})
                await page2.bringToFront();
                break
            }
          }
        



    }catch(e){
        console.log(e)
    }
})();