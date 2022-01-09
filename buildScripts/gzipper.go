/* This gzips some of the larger client files, to be served by nginx in prod mode.
 *
 * This script could be improved to not hard-code-reference the output files, but
 * instead loop over all of the generated client files and gzip them.
 */

package main

import (
	"bytes"
	"compress/gzip"
	"fmt"
	"os"
)

var PATHS = [2]string{"./build/client/out.css", "./build/client/out.js"}

func main() {
	// Gzip the large files
	for i := 0; i < len(PATHS); i++ {
		err := gzipFile(PATHS[i])
		if err != nil {
			fmt.Printf("Error occured compressing file: %v. %v\n", PATHS[i], err)
		}
	}
}

func gzipFile(filePath string) error {
	// Read the text of the file
	fileText, err := os.ReadFile(filePath)
	// Gzip the text
	var buf bytes.Buffer
	zw := gzip.NewWriter(&buf)
	zw.Write([]byte(fileText))
	zw.Close()
	// Write the gzipped data to file, in same directory with '.gz' suffix
	os.WriteFile(filePath+".gz", buf.Bytes(), 0666)
	return err
}
