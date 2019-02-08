import React from 'react'
import classNames from 'classnames'
import Drop from 'react-dropzone'

class Dropzone extends React.Component {
   onDrop = (acceptedFiles, rejectedFiles) => {
     console.log(acceptedFiles)
     console.log(rejectedFiles)
   }

   render() {

    const { props: { maxSize, accept } } = this

    return (
      <Drop onDrop={this.onDrop} maxSize={maxSize} accept={accept}>
        {({getRootProps, getInputProps, isDragActive}) => {
          return (
            <div
              {...getRootProps()}
              className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
            >
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Drop files here...</p> :
                  <p>Try dropping some files here, or click to select files to upload.</p>
              }
            </div>
          )
        }}
      </Drop>
    );
  }
}

export default Dropzone