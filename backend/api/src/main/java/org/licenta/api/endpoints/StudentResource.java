package org.licenta.api.endpoints;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;
import org.licenta.api.models.Student;
import org.licenta.api.repositories.StudentRepository;

@Path("/api/student")
@ApplicationScoped
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class StudentResource {
    @Inject
    StudentRepository studentRepository;
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response.ResponseBuilder postStudent (Student student){
        boolean posted = studentRepository.postStudent(student);
        if (!posted){
            return Response.status(Response.Status.BAD_REQUEST);
        }
        return Response.status(Response.Status.OK);
    }
}
