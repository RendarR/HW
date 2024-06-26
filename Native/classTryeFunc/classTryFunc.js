class Libraly {
    #books = null;
    constructor(books){
        if(Array.isArray(books)){                           //Если это не массив, то выдаст ошидку
            this.#books = books;

        } else if(typeof(books) === 'string'){              //Если в экземпляр класса передали один строковый элемент. => В массив его оборачиваем
            this.#books = [books];                          
        } else {
            throw new Error('Вы ввели не массив книг')      //Ошибка
        }
    }
    #filterBooks(tittle){                                   //Свой фильтр. Можно было использовать Array.filter()
        let flag = 0;
        let index = null;
        this.allBooks.forEach((el, i) => {
            if(String(el) === tittle){
                flag = 1;
                index = i;
            }
        })
        return [flag, index];                               //Получаем универсальную функцию, которая передает статус флага и индекс этого элемента
    }
    get allBooks(){                                         //Получаения списка книг
        return this.#books;
    }
    set addBook(tittle){                                    //Добавление книги
        try{
            if(tittle){
                const book = this.#filterBooks(tittle);
                if(book[0] === 0){                          //Проверка флага
                    this.#books.push(tittle);
                    console.log(`Книга ${tittle} добавлена в библиотеку`);
                }
                else{
                    throw new Error(`Книга ${tittle} уже есть`);
                }
            }
            else{
                throw new Error(`Необходимо ввести корректное название книги. Например: '${this.#books[0]}'`)
            }
        } 
        catch(e){
            console.error(e);
        }
        finally{
            // console.log(`Была попытка добавления книги`);
        }
    }
    set removeBook(tittle){
        try{
            if(tittle){
                const book = this.#filterBooks(tittle);
                if(book[0] === 1){                              //Проверка флага
                    this.#books.splice(book[1],1);
                    console.log(`Книга ${tittle} удалена из библиотеки`);
                }
                else{
                    throw new Error(`Книги ${tittle} не было в библиотеке`);
                }
            }
            else{
                throw new Error(`Необходимо ввести корректное название книги. Например: '${this.#books[0]}'`)
            }
        } 
        catch(e){
            console.error(e);
        }
        finally{
            // console.log(`Была попытка добавления книги`);
        }
    }
    hasBook(tittle){
        try{
            if(tittle){
                const book = this.#filterBooks(tittle);
                if(book[0] === 1){                                  //Проверка флага
                    console.log(`${tittle} есть в библиотеке`);
                }
                else{
                    throw new Error(`${tittle} нет в библиотеке`);
                }
            }
            else{
                throw new Error(`Необходимо ввести корректное название книги. Например: '${this.#books[0]}'`)
            }
        } 
        catch(e){
            console.error(e);
        }
        finally{
            // console.log(`Была попытка добавления книги`);
        }
    }
}

const book = new Libraly(['Книга 1','Книга 2'])
book.hasBook('Книга 1');    //Книга 1 есть в библиотеке
book.addBook = 'Книга 3';   //Книга Книга 3 добавлена в библиотеку
book.addBook = 'Книга 3';   //Error: Книга Книга 3 уже есть
book.addBook = 'Книга 4';   //Книга Книга 4 добавлена в библиотеку
book.addBook = 0;           //Error: Необходимо ввести корректное название книги. Например: 'Книга 1'
book.addBook = undefined;   //Error: Необходимо ввести корректное название книги. Например: 'Книга 1'
book.addBook = 'Книга 3';   //Error: Книга Книга 3 уже есть
console.log(book.allBooks); //['Книга 1', 'Книга 2', 'Книга 3', 'Книга 4']

book.removeBook = 'Книга 3' //Книга Книга 3 удалена из библиотеки
console.log(book.allBooks); //['Книга 1', 'Книга 2', 'Книга 4']
book.removeBook = 'Книга 1' //Книга Книга 1 удалена из библиотеки
console.log(book.allBooks); //['Книга 2', 'Книга 4']
book.addBook = 'Книга 4';   //Error: Книга Книга 4 уже есть
book.addBook = 'Книга 3';   //Книга Книга 3 добавлена в библиотеку
console.log(book.allBooks); //['Книга 2', 'Книга 4', 'Книга 3']

book.hasBook('Книга 4')     //Книга 4 есть в библиотеке
book.hasBook('Книга 1')     //Error: Книга 1 нет в библиотеке

const book2 = new Libraly('Книга 1');   //Одна книга образована в массив
book2.addBook = 'Книга 3';              //Книга Книга 3 добавлена в библиотеку
console.log(book2.allBooks);            //['Книга 1', 'Книга 3']

