package api.compiler;

import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class CodeExecutorService {
    private static final String FILE_DIRECTORY = "src/main/java/api/compiler";
    private static final String CONTAINER_NAME = "my_cpp_container";

    public static String executeCppCode(String cppCode, String inputData) throws IOException, InterruptedException {
        String cppFileName = FILE_DIRECTORY + "/main.cpp";
        String inputFileName = FILE_DIRECTORY + "/input.txt";

        createFiles(cppCode, inputData);

        ProcessBuilder startContainerBuilder = new ProcessBuilder("docker", "start", CONTAINER_NAME);
        Process startContainerProcess = startContainerBuilder.start();
        startContainerProcess.waitFor();

        ProcessBuilder copyFilesBuilder = new ProcessBuilder("docker", "cp", cppFileName, CONTAINER_NAME + ":/usr/src/" + "main.cpp");
        Process copyFilesProcess = copyFilesBuilder.start();
        copyFilesProcess.waitFor();

        copyFilesBuilder.command("docker", "cp", inputFileName, CONTAINER_NAME + ":/usr/src/" + "input.txt");
        copyFilesProcess = copyFilesBuilder.start();
        copyFilesProcess.waitFor();

        ProcessBuilder processBuilder = new ProcessBuilder("docker", "exec", "-w", "/usr/src", CONTAINER_NAME, "sh", "-c", "g++ main.cpp -o output && ./output < input.txt");
        Process process = processBuilder.start();
        process.waitFor();

        StringBuilder output = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
        }

        StringBuilder errorOutput = new StringBuilder();
        try (BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()))) {
            String line;
            while ((line = errorReader.readLine()) != null) {
                errorOutput.append(line).append("\n");
            }
        }

        Files.deleteIfExists(Paths.get(cppFileName));
        Files.deleteIfExists(Paths.get(inputFileName));

        //        ProcessBuilder stopContainerBuilder = new ProcessBuilder("docker", "stop", CONTAINER_NAME);
        //        Process stopContainerProcess = stopContainerBuilder.start();
        //        stopContainerProcess.waitFor();

        //        ProcessBuilder removeContainerBuilder = new ProcessBuilder("docker", "rm", CONTAINER_NAME);
        //        Process removeContainerProcess = removeContainerBuilder.start();
        //        removeContainerProcess.waitFor();

        if (!errorOutput.toString().isEmpty()) {
            return errorOutput.toString();
        }
        return output.toString();
    }

    public static void createFiles(String cppCode, String inputData) {
        File directory = new File(FILE_DIRECTORY);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        try {
            File cppFile = new File(directory, "main.cpp");
            FileWriter writer1 = new FileWriter(cppFile);
            writer1.write(cppCode);
            writer1.close();

            File inputFile = new File(directory, "input.txt");
            FileWriter writer2 = new FileWriter(inputFile);
            writer2.write(inputData);
            writer2.close();
        } catch (IOException e) {
            System.out.println("An error occurred while creating the files: " + e.getMessage());
        }
    }
}
