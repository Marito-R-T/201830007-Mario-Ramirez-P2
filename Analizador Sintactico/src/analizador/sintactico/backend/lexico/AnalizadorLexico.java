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
public class AnalizadorLexico {

    public static final String[] boleano2 = {"VERDADERO", "FALSO"};
    public static final String[] reservada2 = {"funcion", "principal", "retornar", "vacio", "variable", "entero", "decimal", "booleano", "cadena", "cadena", "carácter", "si",
        "sino", "mientras", "para", "hacer", "imprimir"};
    public static final String operadores = "+-*/%<>=";
    public static final String agrupacion = "(){}";
    public static final String digito = "1234567890";
    //alfabeto
    public static final String abecedario = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVW";
    public static final String simbolos = "\";1234567890(){}+-*/%<>= ";

    public final Transicion[] transiciones = {
        new Transicion("S0", "/", "S1", false), new Transicion("S0", "'", "S8", false), new Transicion("S0", "\"", "S12", false),
        new Transicion("S0", abecedario, "S15", true, "id"), new Transicion("S0", digito, "S16", true, "entero"), new Transicion("S0", "\";", "S19", true, "signo"),
        new Transicion("S0", agrupacion, "S20", true, "agrupacion"), new Transicion("S0", "<>=", "S21", true, "operador"),
        new Transicion("S0", "%/*-+", "S23", true, "operador"), new Transicion("S1", "*", "S3", false),
        new Transicion("S3", abecedario, "S4", false), new Transicion("S3", simbolos, "S4", false), new Transicion("S4", abecedario, "S4", false),
        new Transicion("S4", simbolos, "S4", false), new Transicion("S4", "*", "S6", false),
        new Transicion("S6", "/", "S7", true, "comentario"), new Transicion("S8", abecedario, "S9", false), new Transicion("S8", simbolos, "S9", false),
        new Transicion("S9", "'", "S10", true, "caracter"),
        new Transicion("S12", abecedario, "S13", false), new Transicion("S12", simbolos, "S13", false), new Transicion("S13", abecedario, "S13", false),
        new Transicion("S13", simbolos, "S13", false), new Transicion("S13", "\"", "S14", true, "cadena"), new Transicion("S15", abecedario, "S15", true, "id"),
        new Transicion("S15", digito, "S15", true, "id"),
        new Transicion("S16", digito, "S16", true, "entero"), new Transicion("S16", ".", "S17", false), new Transicion("S17", digito, "S18", true, "flotante"),
        new Transicion("S18", digito, "S18", true), new Transicion("S21", "=", "S22", true, "operador")};
    //////////////////////////////////////7
    ///////////////////////////////////////
    ///   Varibales ///////////////////
    //////////////////////////////////////7
    /////////////////////////////////////7

    private int pos = 0;
    private Token analizado;
    private int linea;
    private String[] lineas;
    private boolean tope = false;

    public AnalizadorLexico() {
        linea = 0;
    }

    public Token analizarToken() {
        analizado = new Token(pos+1, linea+1);
        recorrerMatriz(true);
        if (analizado.getTipo() != null && analizado.getTipo().equals("id")) {
            verificarBooleano();
            verificarReservada();
        }
        return analizado;
    }

    public void recorrerMatriz(boolean seguir) {
        Character caracter = lineas[linea].charAt(pos);
        boolean s = false;
        if (caracter != ' ') {
            for (Transicion trans : transiciones) {
                if (trans.getEstado().equals(analizado.getEstado())
                        && trans.getTrancision().indexOf(caracter.toString()) != -1) {
                    analizado.getCharacter(caracter);
                    analizado.setEstado(trans.getEstadofinal());
                    analizado.setTipo(trans.getTipo());
                    s = true;
                    pos++;
                    break;
                }
            }
            if (!s && (analizado.getPalabra().equals("") || analizado.getTipo() == null)) {
                analizado.setTipo("error");
                analizado.getCharacter(caracter);
                pos++;
            }
            if (lineas[linea].length() <= pos) {
                linea++;
                pos = 0;
                if (analizado.getTipo() == null) {
                    analizado.setTipo("error");
                    if (!s) {
                        analizado.getCharacter(caracter);
                    }
                }
                if (lineas.length <= linea) {
                    tope = true;
                }
            } else if (s) {
                recorrerMatriz(seguir);
            }
        } else {
            if (analizado.getPalabra() == "") {
                pos++;
                if (lineas[linea].length() <= pos) {
                    pos = 0;
                    linea++;
                    if (lineas.length <= linea) {
                        tope = true;
                    }
                }
                recorrerMatriz(seguir);
            } else {
                pos++;
                if (lineas[linea].length() <= pos) {
                    pos = 0;
                    linea++;
                    if (lineas.length <= linea) {
                        tope = true;
                    }
                }
            }
        }
    }

    public void setLineas(String texto) {
        lineas = texto.split("\n");
    }

    public boolean isTope() {
        return tope;
    }

    public void setTope(boolean tope) {
        this.tope = tope;
    }

    private void verificarBooleano() {
        for (String string : boleano2) {
            if (string.equals(analizado.getPalabra())) {
                analizado.setTipo("boolean");
            }
        }
    }

    private void verificarReservada() {
        for (String string : reservada2) {
            if (string.equals(analizado.getPalabra())) {
                analizado.setTipo("reservada");
            }
        }
    }

    public void setPos(int pos) {
        this.pos = pos;
    }

    public void setLinea(int linea) {
        this.linea = linea;
    }

}
