const game = document.querySelector( '.game' )
const gameBody = document.querySelector( '.game_body--template' )
const gameSelection = document.querySelector( '.game__selection--template' )
let gameImgItems
let gameImgItemsMySelection
let selectionOther
let gameButtonPlayAgain

const items = [ 'paper', 'scissors', 'rock' ]

const random = () => {
    return Math.floor(Math.random() * ( ( items.length - 1 )  - 0 + 1) + 0 );
}

const resultDecided = () => {

    let selecteMine = items.findIndex( item => gameImgItemsMySelection == item )
    let selecteOthers = items.findIndex( item => selectionOther == item )

    if( 
        ( selecteMine == 0 && selecteOthers == 1 ) &&
        ( selecteMine == 1 && selecteOthers == 2 ) &&
        ( selecteMine == 2 && selecteOthers == 0 )
    )
        return 'YOU LOSE'

    return 'YOU WIN'
}

const result = () => {
    const gameTextPlayAgain = document.querySelector( '.game__text--play-again' )
    gameTextPlayAgain.textContent = resultDecided()
}

const configMySelection = ( tag ) => {
    gameImgItemsMySelection = tag.dataset.type
    game.replaceChild( gameSelection.content.cloneNode( true ), document.querySelector( '.game__body' ) )
    const gameImgSelectionMine = document.querySelector( '.game__img--selection--mine' )
    const gameImgItemsSelectionMine = document.querySelector( '.game__img--items-selection--mine' )
    gameImgSelectionMine.src = `images/icon-${gameImgItemsMySelection}.svg`
    gameImgItemsSelectionMine.classList.add( `game__img--${gameImgItemsMySelection}` )
}

const configSelectionOther = () => {


    selectionOther = items[ random() ]

    while ( selectionOther == gameImgItemsMySelection ) {
        selectionOther = items[ random() ]
    }

    const gameImgSelectionOther = document.querySelector( '.game__img--selection--other' )
    const gameImgItemsSelectionOther = document.querySelector( '.game__img--items-selection--other' )
    gameImgSelectionOther.src = `images/icon-${selectionOther}.svg`
    gameImgItemsSelectionOther.classList.add( `game__img--${selectionOther}` )

}


const buttonAgain = () => {
    gameButtonPlayAgain = document.querySelector( '.game__button--play-again' )

    gameButtonPlayAgain.addEventListener( 'click', () => {
            game.replaceChild( gameBody.content.cloneNode( true ), document.querySelector( '.game__body' ) )
            addEventToButton()
        }
    )

}

function mySelectionAction ( e ){

    configMySelection( this )
    configSelectionOther()
    result()
    buttonAgain()
}

const addEventToButton = () => {
    gameImgItems = document.querySelectorAll( '.game__img--items' )

    gameImgItems.forEach( buttons => {
        buttons.addEventListener( 'click', mySelectionAction )
    } )
}

const init = () => {
    game.append( gameBody.content.cloneNode( true ) )
    
    addEventToButton()
}

init()




