class Window{
    #height
    #width
    #element
    constructor(elem){
        this.#height = window.innerHeight
        this.#width = window.innerWidth
        this.#element = elem
        if (this.#width >= 500){
            this.#setSize()
            window.onresize = ()=>{
                this.#width = window.innerWidth
                this.#height = window.innerHeight
                if (this.#width > 500){
                    this.#setSize()
                }
            }
        }
    }
    #setSize(){
        this.#element.style.width = this.#width+"px"
        this.#element.style.height = this.#height+"px"
    }
}
const root = document.querySelector("#root")
window.onload = ()=>{ new Window(root) }

class FormInput{
    #form
    #day
    #month
    #year
    #temp
    #bool
    #echec
    constructor(form){
        this.#form = form
        this.#bool = false
        this.#echec = ""
        this.#temp = document.querySelector("template")
        this.#checkInput()
        if (this.#day && this.#month && this.#year){
            if (this.#testDMY()){
                if (this.#validDate()){
                    console.log("validate")
                }
                else{
                    console.log("non valide")
                    this.#echec = "validate"
                }
            }
            else{
                console.log("Must be a valid DMY")
                this.#echec = "valid"
            }
        }
        else if(typeof this.#day === "number"  || typeof this.#month === "number" || typeof this.#year === "number"){
            this.#echec = "valid"
        }
        else{
            this.#echec = "required"
        }
    }
    #checkInput(){
        let date = []
        if(this.#form.querySelectorAll("input")){
            this.#form.querySelectorAll("input").forEach(i=>{
                date.push(i.value?parseInt(i.value):null)
            })
        }
        [this.#day, this.#month, this.#year] = date
    }
    #daytest(){
        if (this.#day > 31 || this.#day <= 0){
            return false
        }
        return true
    }
    #monthTest(){
        if (this.#month > 12 || this.#month <= 0){
            return false
        }
        return true
    }
    #yearTest(){
        const b = new Date()
        if (this.#year > b.getFullYear()){
            return false
        }
        return true
    }
    #testDMY(){
        if (this.#daytest() && this.#monthTest() && this.#yearTest()){
            return true
        }
        return false
    }
    #validDate(){
        const datev = new Date(this.#year, this.#month-1, this.#day)
        if (datev.getMonth() !== (this.#month - 1)){
            return false
        }
        return true
    }
    get date(){
        return [this.#day, this.#month, this.#year]
    }
    get test(){
        return this.#echec
    }
}
class DateCalculator{
    #now
    #day
    #year
    #month
    #birth
    constructor(array){
        this.#now = new Date()
        this.#birth = new Date(array[2], array[1]-1, array[0])
        this.#diffdate()
    }
    #diffdate(){
        let nby = this.#now.getFullYear() - this.#birth.getFullYear()
        let nbm = this.#now.getMonth() - this.#birth.getMonth()
        let nbd = this.#now.getDate() - this.#birth.getDate()
        const age = new Date(nby, nbm, nbd)
        this.#day = age.getDate()
        this.#month = age.getMonth()
        this.#year = parseInt(age.getFullYear().toString().substr((-1)*nby.toString().length))
    }
    get date(){
        return [this.#day, this.#month, this.#year]
    }
}
const span_target = document.querySelectorAll("#age span")
const form = document.forms[0]
function addData(data){
    let i = 3
    span_target.forEach(e=>{
        i -= 1
        e.innerText = data[i]
    })
}
function resetSpan(){
    span_target.forEach(e => e.innerText = "- -     ")
}
const btn = document.querySelector("form button")
btn.addEventListener("click", (e)=>{
    e.preventDefault()
    let check = new FormInput(form);
    console.log(check.test)
    if (!(check.test)){
        let data = new DateCalculator(check.date)
        addData(data.date)
        form.reset()
        document.querySelectorAll("form label").forEach(e=>{
            e.classList.remove("text-danger")
            e.querySelector("input").classList.remove("input-danger")
        })
        removeDisplay()
    }
    else{
        removeDisplay()
        let echec = check.test;
        console.log(echec)
        if (echec === "required"){
            document.querySelectorAll(".required").forEach(e=>{
                showDisplay(e)
            })
        }
        else if (echec === "valid"){
            console.log("valid")
            document.querySelectorAll(".valid").forEach(e=>{
                showDisplay(e)
            })
        }
        else if (echec === "validate"){
            document.querySelectorAll(".validate").forEach(e=>{
                showDisplay(e)
            })
        }
        document.querySelectorAll("form label").forEach(e=>{
            e.classList.add("text-danger");
            e.querySelector("input").classList.add("input-danger")
        })
    }
})
function showDisplay(e){
    e.classList.add("show")
    e.classList.remove("default")
}
function removeDisplay(e){
    let table = [".required", ".valid", ".validate"]
    for (let i of table){
        document.querySelectorAll(i).forEach(e=>{
            e.classList.remove("show")
            e.classList.add("default")
        })
    }
}