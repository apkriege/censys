from fastapi.responses import JSONResponse

# Define a function to return a JSONResponse with a status code and content
def APIResponse(status_code, content):
    return JSONResponse(status_code=status_code, content=content)