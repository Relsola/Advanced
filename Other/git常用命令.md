# 常用git指令总结

### git config
 - *git config* 用于配置全局信息,一般常用于配置用户名，邮箱
 - *git config --global user.name "zhangsan"*
 - *git config --global user.email "zhangsan@163.com"*


### git init
 - *git init* 初始化仓库


### git clone
 - *git clone <版本库的网址>* 将存储库克隆到新目录中。


### git remote
 - *git remote add origin <版本库的网址>* 把本地仓库与远程仓库连接起来
 - *git remote* 查看远程仓库主机名

### git status
 - *git status* 查看当前代码仓库的状态。


### git log
 - *git log* 查看提交记录。


### git add
 - *git add* 将文件添加至暂存区
 - *git add .* 将有更新的所有文件添加至暂存区


### git commit
 - *git commit -m 注释*  将暂存区内容添加到本地仓库
 - *git commit -am 注释* 相当于*git add .* + *git commit -m 注释* 指令,**但对于新增的文件不能直接使用该指令进行提交。**

 - *git commit --amend* 可以修改最近的一次提交信息。
 **具体操作：**
   1. *git commit --amend* 在弹出面板中输入 *i* 进入编辑模式，然后可以修改 *commit message* 信息
   2. 修改完成之后，按 *Esc* 退出编辑，输入 *:wq* 退出，完成修改
   3. 如果想在最近的一次修改中，新增其他修改，可以使用 *git commit --amend -a* 指令，类似上面两步操作，可以在第二步结束后自动带上暂存区的操作。


### git branch
 - *git branch -a* 查看所有分支。
 - *git branch* 查看本地分支。
 - *git branch -r* 查看远程分支。
 - *git branch -d feature-album* 删除本地分支（删除不了未合并过的分支）。
 - *git branch -D feature-album* 删除未合并过的本地分支
 - *git push origin --delete feature-album* 删除远程分支。
 - *git push origin :refs/branch/feature-album* 删除远程分支，这种方法适用在，分支名和标签名相同时，执行第一种方法会冲突报错，则使用这个方法，因为第一种方法也可以用来删除标签。


### git checkout
 - *git checkout 分支名* 切换分支。
 - *git checkout -b 分支名* 以当前分支为基础，创建一个新的分支。
 - *git checkout fileName* 当还没有进行commit提交的时候，还原某个文件的改动。
 - *git checkout  .* 将工作区的所有文件的内容恢复到暂存区的状态。
 - *git checkout 分支名 文件名* 当我们进行合并操作出现冲突的时候，对于某个文件，我们想要完全保留某个分支对应的该文件版本，可以通过该指令进行操作。


### git pull
 - *git pull <远程主机名> <远程分支名>:<本地分支名>* 命令用于从远程获取代码并合并本地的版本,就是 *git fetch* 和 *git merge* 的简写。
 - *git pull* 如果当前分支只有一个追踪分支，远程主机可以省略。
 - *git pull --rebase <远程主机名> <远程分支名>:<本地分支名>* 如果合并需要采用 *rebase* 模式，可以使用 *–rebase* 选项


### git push
 - *git push <远程主机名> <本地分支名>:<远程分支名>* 用于将本地分支的更新，推送到远程主机。
 - *git push -u <远程主机名> <本地分支名>* 如果当前分支与多个主机存在追踪关系，则可以使用 *-u* 选项指定一个默认主机，这样后面就可以不加任何参数使用 *git push* 。
 - *git push --all origin* 将所有本地分支都推送到 *origin* 主机。


### git stash
 - *git stash* 命令用于将当前的更改存储在一个额外的工作目录中。**一般在面对，我们需要临时处理bug，但是手头工作又没能完全处理完的情况，可以用这个命令暂时将当前分支修改的内容存起来，等后续bug解决之后，再将这部分内容拿出来继续工作。**
 - *git stash save "注释"*  这个命令与直接*git stash*功能上类似，但是可以留下一些备注信息，方便后续应用这部分修改的时候去查找。
 - *git stash list* 展示额外工作目录中所有进行过的存储。也就是每进行一次*git stash*，就会留下一次记录，这个指令将所有的*git stash*操作记录给展示出来。
 - *git stash apply* 应用某个存储,但不会把存储从存储列表中删除，默认使用第一个存储。也可以使用*git stash apply 1*，后面数字可以变动，这样就可以使用存储列表中任一位置的存储。
 - *git stash drop* 从存储列表中删除最近一次的存储。后面加数字可以指定删除某个存储。
 - *git stash clear* 删除所有存储。


### git fetch
 - *git fetch* 将某个远程主机的更新，全部取回本地。默认情况下 *git fetch* 取回所有分支的更新。**注意： 仅仅只会拉取远程的更改，不会进行合并本地分支**
 - *git fetch <远程主机名> <分支名>*  如果只想取回特定分支的更新，可以指定分支名


### git merge
 - *git merge branchName* 将 *branchName* 分支合并到当前分支中，自动进行新的提交
 - *git merge --abort* 当合并遇到冲突时， 想退出合并，可以执行该指令。
 - *git merge --continue* 当合并遇到冲突，解决完冲突之后，可执行该指令完成合并。
 **git merge 的合并，会产生一次新的提交。**


### rebase
 - *git rebase branchName* 将 *branchName* 分支合并到当前分支中，自动进行新的提交
 - *git rebase --abort* 当合并遇到冲突时， 想退出合并，可以执行该指令。
 - *git rebase --continue* 当合并遇到冲突，解决完冲突之后，可执行该指令完成合并。
  **git rebase 整体指令跟merge差不多，但是不同点在于：**
    1. rebase的合并，并不会生成一次新的提交记录。
    2. merge的合并，会生成一条新的提交记录。
  merge解决冲突的时候，只需要解决一次即可，可以理解为，两个分支比对之后，后续更新的提交中所有的不同点都摘出来，处理之后，作为一次新的提交即可完成合并。

  而rebase，如果有多次提交都有冲突文件，那么我们需要去依次解决这些冲突，每处理完成一个，执行*git rebase --continue*指令继续处理下一个冲突，如果某次冲突我们并不需要处理，那么可以使用 *git rebase --skip* 来跳过这次 rebase 操作（**但这个操作使用的时候需谨慎**），当所有冲突处理完成之后即可完成合并。


### git reset
 - *git reset [--soft | --mixed | --hard] [HEAD]* 作用是修改HEAD指针指向的位置，便于我们回退版本。完成回退操作之后，则HEAD指针新指向的版本之后的所有版本都被丢弃。

 - *git reset HEAD^ fileName* 回退某个文件 (fileName) 到上一个版本。

 - *git reset HEAD^ --mixed* *--mixed为默认* 可以不用带该参数，版本会回退到上一个版本，从上一个版本到当前，这期间的修改内容都会被重新放入工作区，也就是工作区文件内容保持不变（**git status之后，这部分内容是 红色 的**）。

 - *git reset HEAD^ --soft* 加了 *--soft* 之后，版本会回退到上一个版本，而从上一个版本到当前，这期间的修改内容会被重新放入暂存区（**git status之后，这部分内容是 绿色 的**）。

 - *git reset HEAD^ --hard* 加了 *--hard* 之后，版本会回退到上一个版本，并将工作区的所有内容进行删除，是一个全方面的回退（**git status之后，得到的是working tree clean**）。

 - *git reset commitId*  回退到指定版本。可以通过*git log*查看日志，复制想要回退的版本*commitId*，再执行此命令进行回退操作。


### git revert
 - *git cherry-pick commitId* 将指定 commitId 的提交合并至当前分支。主要应对某个分支的改动有很多，但是我们这次只想要其中的某一个提交。

 - *git cherry-pick commitIdA..commitIdB*   命令可以转移从 commitIdA 到 commitIdB 的所有提交。其中提交 commitIdA 必须早于提交 commitIdB。注意，commitIdA的提交将不会包含在cherry-pick 中。如果要包含提交 commitIdA，可以使用 *git cherry-pick commitIdA^..commitIB。*


### git restore
 - *git restore 文件名* 丢弃对应文件工作区的内容，类似于撤销。
 - *git restore --stage 文件名* 将提交至暂存区的文件重新放回工作区。



