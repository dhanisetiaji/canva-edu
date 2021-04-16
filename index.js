const puppeteer = require('puppeteer')
const delay =require('delay');
const moment = require('moment');
const COLORS = require("./lib/colors");
const fs = require('fs');
const readlineSync = require('readline-sync');

const emailURL = "https://10minutesemail.net/"
const daftarCanva = "https://www.canva.com/id_id/signup/?signupRedirect=%2Fedu-signup&loginRedirect=%2Fedu-signup&brandingVariant=edu"

const serverOption = {
    headless: false,
    // args: [
    //     '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36',
    //     '--user-data-dir=/tmp/user_data/',
    // ]
}

; async function removeEmailAddress(page) {
    await page.$eval("button[id='deleteEmailAddress']", elem => elem.click())
}




(async () => {
    const jumlah = readlineSync.question("How many ?  ")

    for (let l = 0; l < jumlah; l++) {
            try{
                console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgMagenta, `Bot Started, Wait....`, COLORS.Reset);
                const browser = await puppeteer.launch(serverOption)
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
                        // await page1.$eval("span._38oWvQ"[10], elem => elem.click())
                        // await page1.click("span._38oWvQ")[10]
                        await page1.evaluate(() => document.querySelectorAll("._38oWvQ")[10].click())
                        await page1.type('#__a11yId13', 'Dhani Setiaji')
                        await page1.type('#__a11yId16', getemail)
                        await page1.type('#__a11yId19', 'DhaniGanteng123')
                        console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `=> Regist to Canva`, COLORS.Reset);
                        await page1.evaluate(() => document.querySelectorAll("._38oWvQ")[7].click())
                        console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `=> Done`, COLORS.Reset);
                        console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `=> Delay 20sec, Get Verify Email`, COLORS.Reset);
                        await page.bringToFront();
                        await delay(20000);
                        await page.goto("https://10minutesemail.net/email?id=1",{waitUntil: 'load'})
                        await delay(5000);
                        await page.reload();
                        const elementHandle = await page.$('iframe');
                        const frame = await elementHandle.contentFrame();
                        await frame.click('a');
                        console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `=> Save canva account > result.txt`, COLORS.Reset);
                        await fs.appendFileSync('result.txt', `Email: ${getemail}\n`);
                        await browser.close();
                        break;
                    }
                }

            } catch (e) {
            console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgRed, `Error : ${e}`, COLORS.Reset)
            console.log('')
        }

    }

})() ;