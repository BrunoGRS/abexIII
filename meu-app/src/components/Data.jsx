import React from "react";

export function Data(props){

    return(
        <section>
            <p>Profissionais: {props.profissionais}</p>
            <p>Abordagem: {props.abordagem}</p>
        </section>
    )
}