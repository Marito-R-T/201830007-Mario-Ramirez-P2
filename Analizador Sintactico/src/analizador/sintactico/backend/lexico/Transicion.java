/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package analizador.sintactico.backend.lexico;

/**
 * 
 * @author Sammy Guergachi <sguergachi at gmail.com>
 */
public class Transicion {

    private final String estado;
    private String trancision;
    private String[] trancisiones;
    private final String estadofinal;
    private final boolean aceptado;
    private String tipo;
    
    public Transicion(String estado, String trancision, String estadofinal, boolean aceptado){
        this.estado = estado;
        this.trancision = trancision;
        this.estadofinal = estadofinal;
        this.aceptado = aceptado;
    }
    
    public Transicion(String estado, String[] trancisiones, String estadofinal, boolean aceptado){
        this.estado = estado;
        this.trancisiones = trancisiones;
        this.estadofinal = estadofinal;
        this.aceptado = aceptado;
    }
    
       public Transicion(String estado, String trancision, String estadofinal, boolean aceptado, String tipo){
        this.estado = estado;
        this.trancision = trancision;
        this.estadofinal = estadofinal;
        this.aceptado = aceptado;
        this.tipo = tipo;
    }
    
    public Transicion(String estado, String[] trancisiones, String estadofinal, boolean aceptado, String tipo){
        this.estado = estado;
        this.trancisiones = trancisiones;
        this.estadofinal = estadofinal;
        this.aceptado = aceptado;
        this.tipo = tipo;
    }
    
    public void analizarToken(Token token){
        
    }

    public String getEstado() {
        return estado;
    }

    public String getTrancision() {
        return trancision;
    }

    public String getEstadofinal() {
        return estadofinal;
    }

    public String[] getTrancisiones() {
        return trancisiones;
    }

    public void setTrancisiones(String[] trancisiones) {
        this.trancisiones = trancisiones;
    }

    public boolean isAceptado() {
        return aceptado;
    }

    public String getTipo() {
        return tipo;
    }
    
}
