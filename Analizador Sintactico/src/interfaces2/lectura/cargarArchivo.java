/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.interfaces2.lectura;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

/**
 *
 * @author odra
 */
public class cargarArchivo {
    
    public String cargar(File file){
         String codigo = "";
        
        FileReader fr = null;
        BufferedReader entrada = null;
        try {
            fr = new FileReader(file);
            entrada = new BufferedReader(fr);
            
            while (entrada.ready()) {
                codigo += entrada.readLine()+"\n";
            }
            
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (null != fr) {
                    fr.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return codigo;
    }
}
