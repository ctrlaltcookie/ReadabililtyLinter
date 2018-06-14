Overview
Windows does not come out of the box with the unix-based tooling that much of development depends on. This guide addressed this by providing a path to enlightenment other than “just request a mac from service desk”.

Bash Emulation
There are several options, three of which have been listed below

Git Bash can be installed with Git SCM
Cygwin - popular choice for getting access to Unix tools on Windows. Node may have issues with this, but these can be worked around.
MySysGit - This is sometimes bundled with other tools such as cmder
Node
A good node version manager is nvm-windows. You will need to uninstall any existing versions of node and then install via nvm.

Installing node version manager
It is strongly suggested that you do not accept all of the default options in the installer

When the installer completes it appends the PATH environment variable with the NVM_* environment variables which may not always be expanded. The current version of node is controlled by a symbolic link which defaults to the program files folder. To correct these issues please use following values when prompted with variables expanded e.g. c:\users\myname not %userprofile%.

Install location: ﻿%userprofile%\AppData\Roaming\nvm
Node.js symlink: %userprofile%\AppData\Roaming\nodejs
Run cmd.exe: No - We want to make additional changes once the installer completes.
Once the installer completes the following changes need to be made to the environment variables

Remove system environment variables for NVM_HOME and NVM_SYMLINK
Modify system PATH environment variable by removing references to NVM_HOME and NVM_SYMLINK
Add/modify the user’s PATH environment variable to include %NVM_HOME%;%NVM_SYMLINK%
These changes will result in a user install and remove any issues that might occur with variable expansion in the Path environment variable.

Installing node version
To install a version of node, launch a command prompt (or terminal) and run

nvm install <version> [arch]
Please refer to the readme for more information﻿

When running npm install, some modules require compiler tools to be present, if it is unable to locate them you may see errors similar to this. If using the Visual Studio C++ compiler, you can configure which version it uses by setting the following config:

npm config set msvs_version 2013 --global
There are a lot of other suggestions on stackoverflow about how to fix this, but this was the least invasive one, YMMV.

Configuring JavaScript Package Registry
Packages published by Piksel are not public and therefore the private registry must be configured for npm. The internal registry also acts as a proxy to an upstream registry for non piksel packages.

See Node Development for instructions.

GNU Make
GNU Make is a tool which controls the generation of executables and other non-source files of a program from the program’s source files.

If you do not already have this tool installed it can be downloaded from www.equation.com Once downloaded ensure that the location is added to your Path environment variable.

Mongo
At the time of writing, mongo requires a hotfix on windows 7/windows 2008. Linked to from main page. Check if this is still required for the version of mongodb installed.

Please view the tutorial for installation and configuration details.

Ruby
Many of the Ruby version managers don’t work nicely with windows, though they can be made to work using cygwin. Pik did seem to be a popular manager, bit is no longer maintained.

Uru seems to work well. Unlike nvm-windows, you install different versions of ruby as normal and then register them with uru:

C:\>uru admin add C:\ruby200\bin
---> Registered ruby at `C:\ruby200\bin` as `200p255`
Running Sequoia Console
In order to run sequoia-service-console locally on a Windows environment, you need at least these steps:

install Python for windows (tested running with version 2.7.11 - 3.x is not supported by node-gyp module!)
install Microsoft Visual Studio (tested runnig with Visual Studio 2012 - reported compilation problems with version 2015)
install MongoDB 2.7 and launch it with mongod.exe
add to the npm configuration the reference to the sequoia registry: edit this file in your user dir ( c:\users\ or c:\windows\users\\): **.npmrc** And add this line:

registry=https://nexus.mgtcore.net/repository/npm
(if the file doesn’t exist, create new one)

download sequoia-service-console from git and launch ‘npm install’ (ensure to have Node version 0.10.x - reported problems with more recent versions!). If install fails due to locked-files errors, try to relaunch multiple times until all the modules are installed without errors.
from the node prompt, set the variables to run against the sandbox enviromnet (don’t use double quotes for variable values!) prior to launch the service:

set SEQ_IDENTITY_PUBLIC_URI=http://identity-sandbox.sequoia.piksel.com/
set SEQ_REGISTRY_PUBLIC_URI=http://registry-sandbox.sequoia.piksel.com/
call node service.js
