package com.example.mymovies.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value="/apis")
public class MusicRestController {

    @Autowired
    private ResourceLoader resourceLoader;

    //TESTE CONEXÃO

    @GetMapping(value="/teste-conexao")
    public ResponseEntity<Object>testeConexao()
    {
        return ResponseEntity.ok().body("servidor ativo");
    }



    // UPLOAD DO ARQUIVO.mp3

    @PostMapping(value="add-musica-audio")
    public ResponseEntity<Object> addMusicaAudio(@RequestParam("musica") String musica,
                                                 @RequestParam("cantor") String cantor,
                                                 @RequestParam("estilo") String estilo,
                                                 @RequestParam("file") MultipartFile ArqMusica) throws IOException {
        File pasta = new File(getStaticPath()+"\\musicas");
        if (!pasta.exists())
            pasta.mkdir();


        String NomeArq = "";
        NomeArq = musica + "_" + estilo + "_" + cantor + ".mp3";
        try {
            Files.copy(ArqMusica.getInputStream(), Paths.get(pasta.getAbsolutePath()).
                    resolve(NomeArq), StandardCopyOption.REPLACE_EXISTING);
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body("Erro ao receber a musica "+e.getMessage());
        }
        return ResponseEntity.ok("inserido com sucesso");
    }
    public String getStaticPath() throws IOException {
        String staticPath = null;
        staticPath = resourceLoader.getResource("classpath:static").getFile().getAbsolutePath();
        return staticPath;
    }


    // ENVIAR URLS DOS ARQUIVOS PARA O FRONT

    @GetMapping("/Pesquisa/{NomePes}")
    public ResponseEntity<List<String>> PesquisaMusicas (@PathVariable String NomePes)
    {
        File directory = new File("target/classes/static/musicas/");
        File[] files = directory.listFiles();
        if (files == null)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        else
        {
            List<String> matchingPaths = new ArrayList<String>();
            String path = "http://localhost:8080/musicas/";
            String URL;
            for (File file : files)
            {
                if (file.isFile() && file.getName().contains(NomePes))
                {
                    URL = path + file.getName();
                    matchingPaths.add(URL);
                }
            }
            if (matchingPaths.isEmpty())
                return ResponseEntity.notFound().build();
            else
                return ResponseEntity.ok().body(matchingPaths);
        }

    }
}