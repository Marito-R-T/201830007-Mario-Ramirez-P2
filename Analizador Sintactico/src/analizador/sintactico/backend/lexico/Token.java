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
public class Token {
    
    private String tipo;
    private String palabra;
    private int posicion;
    private int linea;
    private String estado;

    public Token(int pos, int linea){
        tipo ="";
        palabra ="";
        this.linea = linea;
        posicion = pos;
        estado = "S0";
    }
    
    public void getCharacter(Character caracter){
        palabra += caracter;
    }
    
    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getPalabra() {
        return palabra;
    }

    public void setPalabra(String palabra) {
        this.palabra = palabra;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public int getPosicion() {
        return posicion;
    }

    public void setPosicion(int posicion) {
        this.posicion = posicion;
    }

    public int getLinea() {
        return linea;
    }

    public void setLinea(int linea) {
        this.linea = linea;
    }
    
}
