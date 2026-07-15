package dev.controller;

import dev.entity.Autor;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class AutorController  {


    @Transactional
    public Autor createAutor(Autor  autor) {
        autor.setId(null);
        autor.persist();
        return autor;
    }

    @Transactional
    public void deleteAutor(int id) {
        Autor  a = Autor .findById(id);
        if (a != null) {
            a.delete();
        }
    }

    public List<Autor > getAllAutors() {
        return Autor .listAll();
    }

    @Transactional
    public Autor  getAutorById(int id) {
        return Autor .findById(id);
    }


    @Transactional
    public void updateAutor(Autor  autor) {
        Autor  updateAutor = Autor .findById(autor.getId());
        if (updateAutor != null) {
            updateAutor.setName(autor.getName());
            updateAutor.setLastname(autor.getLastname());
            updateAutor.persist();
        }
    }

}
