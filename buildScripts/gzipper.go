// This gzips some of the larger client files, to be served by nginx in prod mode.

package main

import (
	"bytes"
	"compress/gzip"
	"fmt"
	"os"
)

func main() {
	// Gzip the large files
	paths := [2]string{"./build/client/out.css", "./build/client/out.js"}
	for i := 0; i < len(paths); i++ {
		err := compressFile(paths[i])
		if err != nil {
			fmt.Printf("Error occured compressing file: %v. %v\n", paths[i], err)
		}
	}
}

func compressFile(filePath string) error {
	// Read the text of the file
	fileText, err := os.ReadFile(filePath)
	// Gzip the text
	var buf bytes.Buffer
	zw := gzip.NewWriter(&buf)
	zw.Write([]byte(fileText))
	zw.Close()
	// Wrie the gzipped data to file, in same directory with '.gz' suffix
	os.WriteFile(filePath+".gz", buf.Bytes(), 0666)
	return err
}
