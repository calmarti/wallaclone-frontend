function MainButton({textbutton, boton_accion}){
    return (
        <button onclick={boton_accion} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full">
            {textbutton}
        </button>
    )
}

export default MainButton