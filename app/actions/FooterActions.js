import alt from '../alt'

class FooterActions {
    constructor(){
        this.generateActions(
            'getTopCharactersSuccess',
            'getTopCharatersFail'
        )
    }

    getTopCharacters(){
        $.ajax({url: '/api/characters/top' })
            .done((data) => {
                this.actions.getTopCharactersSuccess(data)
            })
            .fail((jqXhr) => {
                this.actions.getTopCharatersFail(jqXhr)
            })
    }
}

export default alt.createActions(FooterActions)
