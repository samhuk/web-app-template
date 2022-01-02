// This gzips some of the larger client files, to be served by nginx in prod mode.

package main

import (
	"bytes"
	"compress/gzip"
	"os"
)

func main() {
	// Gzip the large files
	compressFile("./build/client/out.css")
	compressFile("./build/client/out.js")
}

func compressFile(filePath string) {
	// Read the text of the file
	fileText, _ := os.ReadFile(filePath)
	// Gzip the text
	var buf bytes.Buffer
	zw := gzip.NewWriter(&buf)
	zw.Write([]byte(fileText))
	zw.Close()
	// Wrie the gzipped data to file, in same directory with '.gz' suffix
	os.WriteFile(filePath+".gz", buf.Bytes(), 0666)
}
