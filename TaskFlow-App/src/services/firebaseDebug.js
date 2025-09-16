export const debugFirebaseConfig = async ()=>{
    console.log( "App incializada: ", !!app)
    console.log("Configuración: ", {
        projectId: app?.options?.projectId,
        authDomain: app?.options?.authDomain,
        storageBucket: app?.options?.storageBucket
    })

    console.log("Validando el estado de auth del usuario")
    console.log("Auth inicializado", !!auth)
    console.log("Usuario actual: ", auth?.currenUser?.email || "no alcanzo")
    console.log("")

}